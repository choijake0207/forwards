"use client"
import React, {useContext, useMemo} from 'react'
import styles from "../../styles/analytics.module.css"
import { HabitContext } from '@/context/HabitContext'
export default function Analytics() {

  const {processedHabits} = useContext(HabitContext)
  
  // Total # of checkins
  let totalCheckIns = processedHabits.flatMap(habit => habit.checkIns)
  console.log(totalCheckIns)
  
  // Total # of missed checkins (i.e isChecked === false && isCheckInDay === true)
  



  return (
    <div className={`${styles.analytics} ${styles.page}`}>
      <div className={styles.graph_component}>GRAPH COMPONENT</div>
      <section className={styles.analytics_widget_row}>

        <div className={styles.analytics_widget}>
          <p>Total Check Ins:</p>
          <p>{totalCheckIns.length}</p>
        </div>

      </section>
      <ul className={styles.analytics_accordion}>Accordion</ul>
      
    </div>
  )
}
