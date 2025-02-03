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

  // calculate days
  const getDays = useMemo(() => {
    if (window === "Week") return 7
    if (window === "Month") return getDaysInMonth(new Date())
    return differenceInDays(getTimeFrame.end, getTimeFrame.start) + 1
  }, [window, getTimeFrame])

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
          {habits.map(habit => { // change this so it maps from filtered habits
            return (
              <ProgressCard
                key={habit.id}
                habit={habit}
                displayType={display}
                windowType={window}
                dayCount={getDays}
              />
            )
          })}
        </ul>
      </div>

    </div>
  )
}


