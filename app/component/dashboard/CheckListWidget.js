import React, {useContext} from 'react'
import styles from "../../styles/checklistWidget.module.css"
import Card from '../habit/card'
import { HabitContext } from '@/context/HabitContext'
import {format} from "date-fns"

export default function CheckListWidget({habits, checkIn, undoCheck}) {
    const {optimisticCheckIns} = useContext(HabitContext)
    // let unchecked = habits.filter(habit => habit.lastCheck !== null)
    const today = new Date().setHours(0, 0, 0, 0)
    const formattedToday = new Date(today).toLocaleString("en-US", {weekday: "short"})
    const longFormattedToday = new Date(today).toLocaleString("en-US", {weekday: "long"})

  return (
    <div className={styles.checklist_widget}>
        <header className={styles.checklist_header}>
            <h2>{longFormattedToday}'s Checklist</h2> 
            {/* <p className={styles.checklist_counter}>
                {`( ${unchecked.length} / ${habits.length} )`}
            </p> */}
        </header> 
     
        <ul className={styles.checklist}>
            {habits.length > 0 ? (
                habits
                .slice()
                .sort((a, b) => {
                    const aCheckInToday = a.frequency === "DAILY" || a.daysOfWeek.includes(formattedToday);
                    const bCheckInToday = b.frequency === "DAILY" || b.daysOfWeek.includes(formattedToday);
                    return bCheckInToday - aCheckInToday; // Move `true` values to the front
                })
                .map(habit => { 
                    let current = new Date().setHours(0, 0, 0, 0)
                    let stringCurrent = current.toString()
                    const checkInKey = `${habit.id}-${stringCurrent}`
                    const isChecked = optimisticCheckIns.current.has(checkInKey) ? 
                        optimisticCheckIns.current.get(checkInKey)
                        : habit.lastCheck && habit.lastCheck === stringCurrent
                    const checkInToday = habit.frequency === "DAILY" || habit.daysOfWeek.includes(formattedToday)
                    return (
                        <Card
                            key={habit.id}
                            name={habit.name}
                            color={habit.color}
                            type={habit.type}
                            id={habit.id}
                            isChecked={isChecked}
                            isToday={checkInToday}
                        />
                    )   
                })
            ) : (
                <div className={styles.empty_checklist_message}>
                    <img src="/jump.png" alt="jumping" className={styles.empty_checklist_img}/>
                    <p>No Habits Created Yet</p>
                </div>
            )
            }
            
        </ul>
    </div>
  )
}
