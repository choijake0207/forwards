import React from 'react'
import styles from "../../styles/progressCard.module.css"
import ProgressBar from './ProgressBar'
import ProgressGrid from './ProgressGrid'
import { CheckCircle, XCircle } from 'phosphor-react'


export default function ProgressCard({habit, displayType, days}) {
  return (
    <div className={styles.progress_card}>
        <p className={styles[habit.color]}>
          {habit.type === "START" ? <CheckCircle/> : <XCircle/>}
          {habit.name}
        </p>
        {
            displayType === "grid" ?
            <ProgressGrid days={days} color={habit.color}/>
            : <ProgressBar days={days} color={habit.color}/>
        }
    </div>
  )
}
