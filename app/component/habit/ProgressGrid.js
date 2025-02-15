import React, {useContext, useState} from 'react'
import styles from "../../styles/progressCard.module.css"
import { HabitContext } from '@/context/HabitContext'
import {format} from "date-fns"

export default function ProgressGrid({days, color, habit}) {
    const {progressWindow} = useContext(HabitContext)
    const [dateModal, setDateModal] = useState(null)

  return (
    <div className={`${styles.progress_grid } ${styles[progressWindow]}`} key={habit.id}>
 
        {
            days.map((day, index) => {
                return (
            
                        <div
                            key={day.date}
                            className={`
                                ${day.isChecked ? styles.checked : ""} 
                                ${day.isCheckInDay ? styles.checkin_day :""} 
                                ${styles.grid_cell}  
                                ${styles[color]}
                                ${new Date(day.date).getTime() < new Date(habit.createdAt).setHours(0,0,0,0) ? styles.nonexist : ""}

                            `}
                            onMouseOver={() => setDateModal(index)}
                            onMouseOut={() => setDateModal(null)}
                        >
                            {dateModal === index && 
                                <div key={index} id={styles.cell_modal}>
                                    {format(day.date, "M/d")}
                                </div>
                            }
                        </div>
                      
       
                )
            })
        }

      
    </div>
  )
}
