import React from 'react'
import styles from "../../styles/checklistWidget.module.css"
import Card from '../habit/card'

export default function CheckListWidget({habits, checkIn}) {
  return (
    <div className={styles.checklist_widget}>
        <h2>Today's Checklist</h2>
        <ul className={styles.checklist}>
            {habits.length > 0 ? (
                habits.map(habit => {
                    return (
                        <Card
                            key={habit.id}
                            name={habit.name}
                            color={habit.color}
                            type={habit.type}
                            id={habit.id}
                            handleCheckIn={checkIn}
                        />
                    )   
                })
            ) : (
                <p>No Habits Created Yet</p>
            )
            }
            
        </ul>
    </div>
  )
}
