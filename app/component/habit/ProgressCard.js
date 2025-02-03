import React from 'react'
import styles from "../../styles/progressCard.module.css"

export default function ProgressCard({habit, windowType, displayType}) {
  return (
    <div className={styles.progress_card}>
        <p>{habit.name}</p>
    </div>
  )
}
