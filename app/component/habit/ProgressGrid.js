import React from 'react'
import styles from "../../styles/progressCard.module.css"
export default function ProgressGrid({windowType, habit, days}) {

  return (
    <div className={styles.progress_grid}>
        {
            days.map(day => {
                return (
                    <div
                        className={`${day.isChecked ? styles.checked : ""} ${day.isCheckInDay ? styles.checkin_day :""} ${styles.grid_cell}`}
                    >
                    </div>
                )
            })
        }
      
    </div>
  )
}
