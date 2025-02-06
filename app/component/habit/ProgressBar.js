import React from 'react'
import styles from "../../styles/progressCard.module.css"
export default function ProgressBar({ days, color}) {

  // bar progress = days checked / total days to be checked
  let daysToBeChecked = days.filter(day => day.isCheckInDay === true)
  let daysChecked = days.filter(day => day.isChecked === true)
  let progress = (daysChecked.length / daysToBeChecked.length) * 100


  return (
    <div className={styles.progress_bar}>
      <div className={`${styles.progress_bar_filler} ${styles[color]}`} style={{width: `${progress}%`}}></div>
    </div>
  )
}
 