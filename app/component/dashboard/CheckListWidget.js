import React from 'react'
import styles from "../../styles/checklistWidget.module.css"
import Card from '../habit/card'

export default function CheckListWidget({habits}) {
  return (
    <ul className={styles.checklist_widget}>
        {habits.length > 0 ? (
            habits.map(habit => {
                return (
                    <Card
                        key={habit.id}
                        name={habit.name}
                        color={habit.color}
                        type={habit.type}
                        id={habit.id}
                    />
                )   
            })
        ) : (
            <p>No Habits Created Yet</p>
        )
        }
        
    </ul>
  )
}
