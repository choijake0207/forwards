import React, {useContext} from 'react'
import styles from "../../styles/checklistWidget.module.css"
import Card from '../habit/card'
import { HabitContext } from '@/context/HabitContext'

export default function CheckListWidget({habits, checkIn, undoCheck}) {
    const {optimisticCheckIns} = useContext(HabitContext)
    // let unchecked = habits.filter(habit => habit.lastCheck !== null)
    const today = new Date().setHours(0, 0, 0, 0)

  return (
    <div className={styles.checklist_widget}>
        <header className={styles.checklist_header}>
            <h2>Today's Checklist</h2>
            {/* <p className={styles.checklist_counter}>
                {`( ${unchecked.length} / ${habits.length} )`}
            </p> */}
        </header> 
     
        <ul className={styles.checklist}>
            {habits.length > 0 ? (
                habits.map(habit => { 
                    const checkInKey = `${habit.id}-${new Date(new Date().setHours(0,0,0,0))}`
                    const isChecked = optimisticCheckIns.current.has(checkInKey) ? 
                        optimisticCheckIns.current.get(checkInKey)
                        : habit.lastCheck && new Date(habit.lastCheck).setHours(0,0,0,0) === today
                    return (
                        <Card
                            key={habit.id}
                            name={habit.name}
                            color={habit.color}
                            type={habit.type}
                            id={habit.id}
                            isChecked={isChecked}
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
