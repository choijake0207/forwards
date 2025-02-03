import React from 'react'
import styles from "../../styles/progressCard.module.css"
import ProgressBar from './ProgressBar'
import ProgressGrid from './ProgressGrid'


export default function ProgressCard({habit, windowType, displayType, dayCount}) {
  return (
    <div className={styles.progress_card}>
        <p>{habit.name}</p>
        {
            displayType === "grid" ?
            <ProgressGrid habit={habit} windowType={windowType} dayCount={dayCount}/>
            : <ProgressBar/>
        }
    </div>
  )
}
