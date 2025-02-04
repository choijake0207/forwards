import React, { useEffect, useMemo, useState } from 'react'
import styles from "../../styles/progressWidget.module.css"
import { Plus, CaretLeft, CaretRight, ChartBarHorizontal, SquaresFour } from 'phosphor-react'
import ProgressCard from '../habit/ProgressCard'
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, getDaysInMonth, format, differenceInDays, getTime, addWeeks, addMonths  } from 'date-fns'

export default function ProgressWidget({toggleForm, habits}) {

  const [display, setDisplay] = useState("grid")
  const displayTypes = ["bar", "grid"]
  const [window, setWindow] = useState("Week")
  const windowTypes = ["Week", "Month", "All"]
  const [offSet, setOffSet] = useState(0)
  // const [updatedHabits, setUpdatedHabits] = useState([])

  // timeframe setter function
  const getTimeFrame = useMemo(() => {
    const today = new Date()
    if (window === "Week") {
      return {start: startOfWeek(addWeeks(today, offSet), {weekStartsOn: 1}), end: endOfWeek(addWeeks(today, offSet), {weekStartsOn: 1})}
    } else if (window === "Month") {
      return {start: startOfMonth(addMonths(today, offSet)), end: endOfMonth(addMonths(today, offSet))}
    } else {
      const firstHabitDate = habits.length > 0 ? new Date(Math.min(...habits.map(habit => new Date(habit.createdAt)))) : today
      return {start: firstHabitDate, end: today}
    }
  }, [window, habits, offSet])

  // format timeframe
  const formatTimeFrame = (start, end) => {
    return `${format(start, "MM/dd")} - ${format(end, "MM/dd")}`
  }

  // create a new array of day objects with date, check in boolean, check in requirement
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

  // append day objects to existing habit array
  // useEffect(() => {
  //   setUpdatedHabits(
  //     habits.map(habit => ({
  //       ...habit,
  //       days: generateDayObjects(habit)
  //     }))
  //   )
  // }, [habits, getTimeFrame])
  const updatedHabits = useMemo(() => {
    return habits.map((habit) => ({
      ...habit,
      days: generateDayObjects(habit)
    }))
  }, [habits, getTimeFrame])

  // event handler for offsetting timeframe
  const handleDecrement = () => setOffSet(prev => prev - 1)
  const handleIncrement = () => setOffSet(prev => prev + 1)


  return (
    <div className={styles.progress_widget}>

      <header className={styles.progress_header}>
        <div className={styles.header_date}>
          <div className={styles.date_btn_container}>
            <button className={styles.date_btn} onClick={handleDecrement} disabled={window === "All"}><CaretLeft/></button>
            <button className={styles.date_btn} onClick={handleIncrement} disabled={window === "All"}><CaretRight/></button>
          </div>
          <h2>{formatTimeFrame(getTimeFrame.start, getTimeFrame.end)}</h2>
        </div>
        <button onClick={toggleForm} className={styles.form_toggle_btn}><Plus/> Create Habit</button>
      </header>

      <div className={styles.progress_views}>
        <div className={styles.progress_toolbar}>
          <div className={styles.date_interval_selector}>
            {windowTypes.map(type => {
              return (
                <button 
                  className={window === type ? styles.active_window : ""}
                  key={type}
                  onClick={() => setWindow(type)}
                >
                  {type}
                </button>
              )
            })}
          </div>
          <div className={styles.display_type_selector}>
            {displayTypes.map(type => {
              return  (
                <button
                  className={display === type ? styles.active_display : ""}
                  key={type}
                  onClick={() => setDisplay(type)}
                >
                  {type === "bar" ? <ChartBarHorizontal/> : <SquaresFour/>}
                </button>
              )
            })}
          </div>
        </div>
        
        <ul className={styles.progress_list}>
          {updatedHabits.map(habit => { // change this so it maps from filtered habits
            return (
              <ProgressCard
                key={habit.id}
                habit={habit}
                displayType={display}
                windowType={window}
                days={habit.days}
              />
            )
          })}
        </ul>
      </div>

    </div>
  )
}


