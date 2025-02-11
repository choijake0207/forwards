"use client"
import { createContext, useState, useEffect, useMemo, useRef } from "react";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, getDaysInMonth, format, differenceInDays, getTime, addWeeks, addMonths  } from 'date-fns'
import { fetchHabitsAPI, createHabitAPI, fetchSingleHabitAPI , deleteHabitAPI} from "@/app/api/protected/habit/HabitCalls";
import { createCheckInAPI, deleteCheckInAPI } from "@/app/api/protected/checkin/CheckInCalls";

export const HabitContext = createContext()
export const HabitProvider = ({children}) => {
    const [rawHabits, setRawHabits] = useState(null)
    const [processedHabits, setProcessedHabits] = useState([])
    const [progressWindow, setProgressWindow] = useState("Week")
    const [windowOffset, setWindowOffset] = useState(0)
    const [loading, setLoading] = useState(true)

    // MAJOR BUG: checking in/undoing check adds pseudo-checkin object for optimistic rendering to processedhabits
    // changing window or timeframe after causes processor useEffect to run but initial fetchAll doesn't
    // therefore, hydrates processedHabits with stale API data as well as deleting optimistic render psuedo-objects
    // SOLUTION: useRef for render persistence

    const optimisticCheckIns = useRef(new Map())

    // INITIAL ALL HABITS FETCH
    const fetchHabits = async () => {
        try {
            const response = await fetchHabitsAPI()
            setRawHabits(response)
            console.log("Initial Fetch Raw", response)
            // clear useRef optimistic data once updated data is fetched
            response.forEach(habit => {
                habit.checkIns.forEach(checkIn => {
                    const checkInKey = `${habit.id}-${new Date(new Date(checkIn.date).setHours(0,0,0,0))}`;
                    if (optimisticCheckIns.current.has(checkInKey)) {
                        optimisticCheckIns.current.delete(checkInKey); 
                    }
                });
            });
        } catch (error) {
            console.error("error fetching habits", error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchHabits()
    }, [])

  // TIMEFRAME CALCULATOR (User Selected)
    const getTimeFrame = useMemo(() => {
        const today = new Date()
        if (!rawHabits || rawHabits.length === 0) {
            return {start: today, end: today}
        }
        if (progressWindow === "Week") {
            return {start: startOfWeek(addWeeks(today, windowOffset), {weekStartsOn: 1}), end: endOfWeek(addWeeks(today, windowOffset), {weekStartsOn: 1})}
        } else if (progressWindow === "Month") {
            return {start: startOfMonth(addMonths(today, windowOffset)), end: endOfMonth(addMonths(today, windowOffset))}
        } else {
            const firstHabitDate = rawHabits.length > 0 ? new Date(Math.min(...rawHabits.map(habit => new Date(habit.createdAt)))) : today
            return {start: firstHabitDate, end: today}
        }
    }, [progressWindow, rawHabits, windowOffset])

    const generateDayObjects = (habit) => {
        let current = new Date(getTimeFrame.start)
        let days = []
        while (current <= getTimeFrame.end) {
        let stringFormat = current.toLocaleString("en-US", {weekday: "short"})
        let formattedCurrent = format(current, "yyyy-MM-dd")
        let checkInKey = `${habit.id}-${new Date (new Date(current).setHours(0,0,0,0))}`
        // is today a check in day (boolean)
        const isCheckInDay = habit.frequency === "DAILY" || Array.isArray(habit.daysOfWeek) && habit.daysOfWeek.includes(stringFormat)
        // has today been checked (boolean)
        const isChecked = 
            optimisticCheckIns.current.has(checkInKey) ?
                optimisticCheckIns.current.get(checkInKey)
                : habit.checkIns.some(checkIn => format(new Date(checkIn.date).setHours(0,0,0,0), "yyyy-MM-dd") === formattedCurrent)
        // append booleans and date as object into days array
        days.push({
            date: current,
            isCheckInDay,
            isChecked
        })
        current = new Date(current.getTime() + 86400000)
        }
        return days
    }

 // PROCESS HABITS BY APPENDING DAYS ARRAY BASED ON TF
    useEffect(() => {
        if (rawHabits && rawHabits.length > 0) {
            setProcessedHabits(
                rawHabits ? rawHabits.map(habit => ({
                    ...habit,
                    days: generateDayObjects(habit)
                })) : []
            );
        }
    }, [rawHabits, getTimeFrame]);

 // CREATE CHECKIN
    const checkIn = async (habitId) => {
        const previousHabits = [...processedHabits]
        const today = new Date ( new Date().setHours(0,0,0,0))
        // store in ref for optimistic render persistence
        optimisticCheckIns.current.set(`${habitId}-${today}`, true)
        try {
          //optimistic render for current render
          setProcessedHabits(prev => 
            prev.map(habit => 
              habit.id === habitId ? 
                {...habit, 
                  lastCheck: new Date(), 
                  checkIns: [...habit.checkIns, {date: today}],
                  days: generateDayObjects({...habit, checkIns: [...habit.checkIns, {date: today}]})
                } 
                : habit
            )
          )
          const response = await createCheckInAPI({habitId})
        } catch (error) {
          console.error("Error Checking In", error)
          // revert optimistic render
          setProcessedHabits(previousHabits)
        }
    }

      // DELETE CHECKIN
    const undoCheck = async (habitId) => {
        const previousHabits = [...processedHabits]
        const today = new Date(new Date().setHours(0,0,0,0))
        try {
        // delete ref persistent optimistic data
        optimisticCheckIns.current.set(`${habitId}-${today}`, false)

        setProcessedHabits(prev => 
            prev.map(habit => 
            habit.id === habitId ? 
                {...habit, 
                lastCheck: null,
                checkIns: habit.checkIns.filter(checkIn => format(checkIn.date, "yyyy-MM-dd") !== format(today, "yyyy-MM-dd")),
                days: generateDayObjects({...habit, checkIns: habit.checkIns.filter(checkIn => format(checkIn.date, "yyyy-MM-dd") !== format(today, "yyyy-MM-dd"))})
                } 
                : habit
            )  
        )
        const response = await deleteCheckInAPI({habitId})
        } catch (error) {
            console.error("Error Undoing Check", error)
            setProcessedHabits(previousHabits)
        }
    }

    // CREATE NEW HABIT
    const createHabit = async (newHabit) => {
        try {
            const response = await createHabitAPI(newHabit)
            await fetchHabits()
            return response
        } catch (error) {
            console.error("Error Creating Habit", error)
        } 
    }
    // Invoking a forced fetch on creation because creating optimistic render would involve processing response object manually and ensuring persistence

    // DELETE HABIT
    const deleteHabit = async (habitId) => {
        console.log("context received", habitId)
        try {
            const response = await deleteHabitAPI(habitId)
            await fetchHabits()
            return response
        } catch (error) {
            console.error("Error Deleting Habit", error)
        }
    }

    return (
        <HabitContext.Provider value={{fetchHabits, rawHabits, createHabit, deleteHabit, loading, optimisticCheckIns, undoCheck, checkIn, processedHabits, windowOffset, setWindowOffset, progressWindow, setProgressWindow, getTimeFrame}}>
            {children}
        </HabitContext.Provider>
    )


}