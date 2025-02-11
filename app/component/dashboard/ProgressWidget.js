import React, { useState, useContext, useEffect } from 'react'
import styles from "../../styles/progressWidget.module.css"
import { Plus, CaretLeft, CaretRight, ChartBarHorizontal, SquaresFour } from 'phosphor-react'
import ProgressCard from '../habit/ProgressCard'
import { HabitContext } from '@/context/HabitContext'
import { differenceInDays, format } from 'date-fns'

export default function ProgressWidget({toggleForm, formattedWindow}) {

  const [display, setDisplay] = useState("grid")
  const displayTypes = ["bar", "grid"]
  const windowTypes = ["Week", "Month", "All"]
  const {processedHabits, setProgressWindow, setWindowOffset, progressWindow, getTimeFrame} = useContext(HabitContext)

  // auto disabled grid view
  useEffect(() => {
    if (progressWindow === "All") {
      setDisplay("bar")
    }
  }, [progressWindow])

  // calculate timeframe for month dates headings and generate headings
  const generateMonthDates = () => {
    let monthDates = []
    let current = new Date(getTimeFrame.start)
    while (current <= new Date(getTimeFrame.end)) {
      monthDates.push(format(new Date(current), "d"))
      current.setDate(current.getDate() + 1)
    }
    return monthDates
  }

  return (
    <div className={styles.progress_widget}>

      <header className={styles.progress_header}>
        <div className={styles.header_date}>
          <div className={styles.date_btn_container}>
            <button className={styles.date_btn} onClick={() => setWindowOffset(prev => prev - 1)} disabled={progressWindow === "All"}><CaretLeft/></button>
            <button className={styles.date_btn} onClick={() => setWindowOffset(prev => prev + 1)} disabled={progressWindow === "All"}><CaretRight/></button>
          </div>
          <h2>{formattedWindow}</h2>
        </div>
        <button onClick={toggleForm} className={styles.form_toggle_btn}><Plus/> Create Habit</button>
      </header>

      <div className={styles.progress_views}>
        <div className={styles.progress_toolbar}>
          <div className={styles.date_interval_selector}>
            {windowTypes.map(type => {
              return (
                <button 
                  className={progressWindow === type ? styles.active_window : ""}
                  key={type}
                  onClick={() => setProgressWindow(type)}
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
                  disabled={progressWindow === "All" && type === "grid"}
                >
                  {type === "bar" ? <ChartBarHorizontal/> : <SquaresFour/>}
                </button>
              )
            })}
          </div>
        </div>
        <div className={`${styles.progress_dates} ${styles[progressWindow]}`}>
            {display === "grid" && 
              (progressWindow === "Week" 
                ? <>
                  <p>Mon</p>
                  <p>Tue</p>
                  <p>Wed</p>
                  <p>Thu</p>
                  <p>Fri</p>
                  <p>Sat</p>
                  <p>Sun</p>
                </>
                : <>
                  {generateMonthDates().map(date => {
                    return (
                      <p key={date}> 
                        {date}
                      </p>
                    )
                  })}
                </>)
            }
        </div>
        <ul className={styles.progress_list}>
          {processedHabits.length > 0 
            ? processedHabits.map(habit => { // change this so it maps from filtered habits
                return (
                  <ProgressCard
                    key={habit.id}
                    habit={habit}
                    displayType={display}
                    days={habit.days}
                  />
                )
              })
            : <div className={styles.empty_progress_message}>
                <img src="/waking-up.png" alt="waking-up" className={styles.empty_progress_img}/>
                <p>Create Your First Habit To Get Started</p>
              </div>
          }
        </ul>
      </div>

    </div>
  )
}


