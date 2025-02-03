import React, { useEffect, useState } from 'react'
import styles from "../../styles/progressWidget.module.css"
import { Plus, CaretLeft, CaretRight, ChartBarHorizontal, SquaresFour } from 'phosphor-react'
import ProgressCard from '../habit/ProgressCard'

export default function ProgressWidget({toggleForm, habits}) {

  const [display, setDisplay] = useState("grid")
  const displayTypes = ["bar", "grid"]
  const [window, setWindow] = useState("Week")
  const windowTypes = ["Week", "Month", "All"]
  const [timeFrame, setTimeFrame] = useState(getTimeFrame("Week", habits))

  useEffect(() => {
    setTimeFrame(getTimeFrame(window, habits))
  }, [window])

  return (
    <div className={styles.progress_widget}>

      <header className={styles.progress_header}>
        <div className={styles.header_date}>
          <div className={styles.date_btn_container}>
            <button className={styles.date_btn}><CaretLeft/></button>
            <button className={styles.date_btn}><CaretRight/></button>
          </div>
          <h2>{`${timeFrame.start} - ${timeFrame.end}`}</h2>
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
          {habits.map(habit => {
            return (
              <ProgressCard
                key={habit.id}
                habit={habit}
                displayType={display}
                windowType={window}
              />
            )
          })}
        </ul>
      </div>

    </div>
  )
}

// timeframe determiner function
function getTimeFrame (window, habits) {
  const today = new Date()
  let start;
  let end;
  switch (window) {
    case "Week":
        start = getStartOfWeek(today)
        end = getEndOfWeek(today)
        return {start: formatDate(start), end: formatDate(end)}
    case "Month":
        return {month: getMonthName(today)}
    case "All":
        start = getFirstHabitDate(habits);
        end = today
        return {start: formatDate(start), end: "Today"}
    default:
        return {}
  }
}

// fetch monday of current week
function getStartOfWeek(today) {
  const day = today.getDay()
  const diff = day === 0 ? -6 : 1 - day
  return new Date(today.setDate(today.getDate() + diff))
}
// fetch sunday of current week
function getEndOfWeek(today) {
  const start = getStartOfWeek(new Date(today))
  return new Date(start.setDate(start.getDate() + 6))
}
// fetch month name
function getMonthName(today) {
  return today.toLocaleString("default", {month: "long"})
}
// format dates
function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  })
}
// fetch date of first habit
function getFirstHabitDate(habits) {
  if (habits.length === 0) {
    return new Date(0)
  }
  return new Date(Math.min(...habits.map(habit => new Date(habit.createdAt).getTime())))
}