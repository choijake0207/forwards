import React, {useContext} from 'react'
import styles from "../../styles/progressCard.module.css"
import { HabitContext } from '@/context/HabitContext'

export default function ProgressGrid({days, color}) {
    const {progressWindow} = useContext(HabitContext)
  return (
    <div className={`${styles.progress_grid } ${styles[progressWindow]}`}>
 
        {
            days.map(day => {
                return (
                    <div
                        key={day.date}
                        className={`${day.isChecked ? styles.checked : ""} ${day.isCheckInDay ? styles.checkin_day :""} ${styles.grid_cell}  ${styles[color]}`}
                    >
                    </div>
                )
            })
        }

      
    </div>
  )
}
