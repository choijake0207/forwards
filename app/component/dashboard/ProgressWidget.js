import React, { useState } from 'react'
import styles from "../../styles/progressWidget.module.css"
import { Plus, CaretLeft, CaretRight, ChartBarHorizontal, SquaresFour } from 'phosphor-react'
import ProgressCard from '../habit/ProgressCard'

export default function ProgressWidget({toggleForm, habits}) {

  const [display, setDisplay] = useState("grid")
  const displayTypes = ["bar", "grid"]
  const [window, setWindow] = useState("Week")
  const windowTypes = ["Week", "Month", "All"]

  return (
    <div className={styles.progress_widget}>

      <header className={styles.progress_header}>
        <div className={styles.header_date}>
          <h2>Mon, Feb 3 - Sun, Feb 10</h2>
          <div className={styles.date_btn_container}>
            <button className={styles.date_btn}><CaretLeft/></button>
            <button className={styles.date_btn}><CaretRight/></button>
          </div>
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
