import React from 'react'
import styles from "../../styles/habitList.module.css"

export default function HabitList({habits}) {
  return (
    <div className={styles.habit_list_widget}>
      <h2>All Habits</h2>
      <ul className={styles.all_habits}>
        {habits.map(habit => {
          return (
            <li key={habit.id}>
                <h3>{habit.name}</h3>

            </li>
          )
        })}
      </ul>
    </div>
  )
}
