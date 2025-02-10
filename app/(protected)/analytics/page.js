"use client"
import React, {useContext, useEffect, useMemo} from 'react'
import styles from "../../styles/analytics.module.css"
import { HabitContext } from '@/context/HabitContext'
import { format } from 'date-fns'
import ClientLoading from '@/app/component/ClientLoading'
export default function Analytics() {

  const {rawHabits, loading, optimisticCheckIns} = useContext(HabitContext)

  // Analytics Data Processing: same day generator but timeframe is determined by createdAt
    // no interactivity with global states


  // get date of first habit creation (starting point for graph component)
  const firstHabitDate = useMemo(() => {
    if (!rawHabits || rawHabits.length === 0) return new Date()
    return new Date(Math.min(...rawHabits.map(habit => new Date(habit.createdAt))))
  }, [rawHabits])
  
  // generate days array
  const generateAnalyticDays = (habit) => {
    let current = new Date(new Date(habit.createdAt).setHours(0,0,0,0))
    let days = []
    let today = new Date()

    while (current <= today) {
      let formattedCurrent = format(current, "yyyy-MM-dd" )
      let stringFormat = current.toLocaleString("en-US", {weekday: "short"})

      // isCheckInDay Today
      const isCheckInDay = habit.frequency === "DAILY" || habit.daysOfWeek.includes(stringFormat)

      // optimistic check-in storage check
      const checkInKey = `${habit.id}-${new Date(new Date(current).setHours(0,0,0,0))}`
      const isChecked = optimisticCheckIns.current.has(checkInKey) 
        ? optimisticCheckIns.current.get(checkInKey)
        : habit.checkIns.some(checkIn => format(new Date(checkIn.date).setHours(0,0,0,0), "yyyy-MM-dd") === formattedCurrent)

      days.push({
        date: current,
        isCheckInDay,
        isChecked
      })
      current = new Date(current.getTime() + 86400000)
      
    }
    return days
  }

  const analyticsHabits = useMemo(() => {
    if (!rawHabits || rawHabits.length === 0) return []
    return rawHabits.map(habit => ({
      ...habit,
      days: generateAnalyticDays(habit)
    }))
  }, [rawHabits])
    
  console.log(analyticsHabits)
  
  


  return (
    <div className={`${styles.analytics} page}`}>
      <div className={styles.empty_analytics}>
        <p>No Habits To Analyze Yet</p>
      </div>
      <div className={styles.graph_component}>GRAPH COMPONENT</div>
      <section className={styles.analytics_widget_row}>

        <div className={styles.analytics_widget}>
          <p>Total Check Ins:</p>
          <p></p>
        </div>

      </section>
      <ul className={styles.analytics_accordion}>Accordion</ul>
      
    </div>
  )
}
