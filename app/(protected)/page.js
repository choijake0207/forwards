"use client"
import React, {useContext, useState, useEffect, useMemo} from 'react'
import { AuthContext } from '@/context/AuthContext'
import HabitForm from '../component/HabitForm'
import styles from "../styles/dashboard.module.css"
import { fetchHabitsAPI } from '@/app/api/protected/habit/HabitCalls'
import ClientLoading from '@/app/component/ClientLoading'
import CheckListWidget from '../component/dashboard/CheckListWidget'
import ProgressWidget from '../component/dashboard/ProgressWidget'
import { createCheckInAPI, deleteCheckInAPI } from '../api/protected/checkin/CheckInCalls'
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, getDaysInMonth, format, differenceInDays, getTime, addWeeks, addMonths  } from 'date-fns'



export default function Dashboard () {
  const {authUser} = useContext(AuthContext)
  const [habits, setHabits] = useState(null)
  const [loading, setLoading] = useState(true)

  // SHARED MODIFIED HABITS STATE
  const [updatedHabits, setUpdatedHabits] = useState([])

  // PROGRESS COMPONENT STATES
  const [progressWindow, setProgressWindow] = useState("Week")
  const [windowOffset, setWindowOffset] = useState(0)
  const [formVisible, setFormVisible] = useState(false)

// INITIAL ALL HABITS FETCH
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetchHabitsAPI()
        setHabits(response)
      } catch (error) {
        console.error("error fetching habits", error)
      } finally {
        setLoading(false)
      }
    }
    fetchHabits()
  }, [])

  // PROGRESS COMPONENT FNs

    // set time frame
  const getTimeFrame = useMemo(() => {
    const today = new Date()
    if (!habits || habits.length === 0) {
      return {start: today, end: today}
    }
    if (window === "Week") {
      return {start: startOfWeek(addWeeks(today, windowOffset), {weekStartsOn: 1}), end: endOfWeek(addWeeks(today, windowOffset), {weekStartsOn: 1})}
    } else if (window === "Month") {
      return {start: startOfMonth(addMonths(today, windowOffset)), end: endOfMonth(addMonths(today, windowOffset))}
    } else {
      const firstHabitDate = habits.length > 0 ? new Date(Math.min(...habits.map(habit => new Date(habit.createdAt)))) : today
      return {start: firstHabitDate, end: today}
    }
  }, [window, habits, windowOffset])

    // format time frame window
  const formatTimeFrame = (start, end) => {
    return `${format(start, "MM/dd")} - ${format(end, "MM/dd")}`
  }
    // create days object per habit
  const generateDayObjects = (habit) => {
    let current = new Date(getTimeFrame.start)
    let days = []
    while (current <= getTimeFrame.end) {
      let stringFormat = current.toLocaleString("en-US", {weekday: "short"})
      let formattedCurrent = format(current, "yyyy-MM-dd")
      console.log("today format", formattedCurrent)
      // is today a check in day (boolean)
      const isCheckInDay = habit.frequency === "DAILY" || habit.daysOfWeek.includes(stringFormat)
      // has today been checked (boolean)
      const isChecked = habit.checkIns.some(checkIn => format(new Date(checkIn.date), "yyyy-MM-dd") === formattedCurrent)
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
    // attach day object to each habit
    useEffect(() => {
      setUpdatedHabits(
        habits ? habits.map(habit => ({
          ...habit,
          days: generateDayObjects(habit)
        })) : []
      );
    }, [habits, getTimeFrame]);


  // CHECKLIST COMPONENT FILTERING
  const date = new Date()
  const today = date.toLocaleString("en-US", {weekday: "short"})
  const todayHabits = useMemo(() => {
    if (!updatedHabits) return []
    return updatedHabits.filter(habit => habit.frequency === "DAILY" || habit.daysOfWeek.includes(today))
  }, [updatedHabits, today])
 

  // CREATE CHECKIN
  const checkIn = async (habitId) => {
    const previousHabits = [...updatedHabits]
    try {
      //optimistic render
      setUpdatedHabits(prev => 
        prev.map(habit => 
          habit.id === habitId ? 
            {...habit, 
              lastCheck: new Date(), 
              checkIns: [...habit.checkIns, {date: format(new Date(), "yyyy-MM-dd")}],
              days: generateDayObjects({...habit, checkIns: [...habit.checkIns, {date: format(new Date(), "yyyy-MM-dd")}]})
            } 
            : habit
        )
      )
      const response = await createCheckInAPI({habitId})
      console.log(response)
    } catch (error) {
      console.error("Error Checking In", error)
      // revert optimistic render
      setUpdatedHabits(previousHabits)
    }
  }

  // DELETE CHECKIN
  const undoCheck = async (habitId) => {
    const previousHabits = [...updatedHabits]
    try {
      setUpdatedHabits(prev => 
        prev.map(habit => 
          habit.id === habitId ? 
            {...habit, 
              lastCheck: null,
              checkIns: habit.checkIns.filter(checkIn => checkIn.date !== format(new Date(), "yyyy-MM-dd")),
              days: generateDayObjects({...habit, checkIns: habit.checkIns.filter(checkIn => checkIn.date !== format(new Date(), "yyyy-MM-dd"))})
            } 
            : habit
        )  
      )
      const response = await deleteCheckInAPI({habitId})
      console.log(response)
    } catch (error) {
        console.error("Error Undoing Check", error)
        setUpdatedHabits(previousHabits)
    }
  }

  return (
    <div className={`${styles.dashboard_page} page`}>

      <header className={styles.dashboard_header}>
        <h1>Hi there, {authUser.firstName}!</h1>
      </header>
  
      <div className={styles.dashboard_main_content}>
        <div className={styles.dashboard_main_widgets_container}>
          {loading 
            ? <ClientLoading/> 
            : <ProgressWidget 
                toggleForm={() => setFormVisible(true)} 
                updatedHabits={updatedHabits}
                handleWindowChange={(type) => setProgressWindow(type)}
                handleDecrement={() => setWindowOffset(prev => prev - 1)}
                handleIncrement={() => setWindowOffset(prev => prev + 1)}
                formattedWindow={formatTimeFrame(getTimeFrame.start, getTimeFrame.end)}
              />
          }
        </div>

        <aside className={styles.dashboard_side_widgets_container}>
          {loading 
            ?  <ClientLoading/> 
            : <CheckListWidget 
                habits={todayHabits} 
                checkIn={checkIn} 
                undoCheck={undoCheck}
              /> 
          }
        </aside>
      </div>

      {formVisible && <HabitForm onClose={() => setFormVisible(false)} status={formVisible}/>}
    </div>
  )
}


