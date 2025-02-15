"use client"
import React, {useContext, useEffect, useMemo} from 'react'
import styles from "../../styles/analytics.module.css"
import { HabitContext } from '@/context/HabitContext'
import { format } from 'date-fns'
import Graph from '@/app/component/analytics/Graph'
import Accordion from '@/app/component/analytics/Accordion'
import ClientLoading from '@/app/component/ClientLoading'
import { Wrench } from "phosphor-react"
export default function Analytics() {

  const {rawHabits, loading, optimisticCheckIns} = useContext(HabitContext)

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


  // append days to habits
  const analyticsHabits = useMemo(() => {
    if (!rawHabits || rawHabits.length === 0) return []
    return rawHabits.map(habit => ({
      ...habit,
      days: generateAnalyticDays(habit)
    }))
  }, [rawHabits])
    
  

    // total check ins
   let totalCheckIns = []
   analyticsHabits.map(habit => habit.checkIns.forEach(checkIn => {totalCheckIns.push(checkIn)}))



   // check in rate calculator
   const start = new Date(firstHabitDate).setHours(0,0,0,0)
   const today = new Date().setHours(0,0,0,0)

   const dataSetGenerator = useMemo(() => {
    let current = new Date(start)
    let rate = []
    while (current <= today) {
      let formattedDate = new Date(new Date(current).setHours(0,0,0,0))
      let totalCheckInDays = 0
      let totalCheckIns = 0

      analyticsHabits.forEach(habit => {
        const dayObject = habit.days.find(day => format(new Date(day.date).setHours(0,0,0,0), "yyyy-MM-dd") == format(new Date(formattedDate).setHours(0,0,0,0), "yyyy-MM-dd"))
        if (dayObject) {
          if (dayObject.isCheckInDay) totalCheckInDays++
          if (dayObject.isChecked) totalCheckIns++
        }
      })

      let dailyRate = totalCheckInDays > 0 ? (totalCheckIns / totalCheckInDays) * 100 : 0
      rate.push(dailyRate)
      current.setDate(current.getDate() + 1)
    }
    return rate
  }, [start, today, analyticsHabits])


  // avg check in rate calculator
  let rateSum = dataSetGenerator.reduce((a, b) => a + b, 0)
  let avg = rateSum/dataSetGenerator.length




  return (
    <div className={`${styles.analytics} page}`}>
      <h1 className={styles.analytics_heading}>Analytics</h1>

      <div className={styles.analytics_wrap}>
       
        <section className={styles.graph_and_accordion}>
          <div className={styles.graph_container}>
            {
              loading ? <ClientLoading/> : <Graph habits={analyticsHabits} firstDate={firstHabitDate} rate={dataSetGenerator}/>
            }
          </div>
          <Accordion habits={analyticsHabits}/>
        </section>

        <aside className={styles.side_components}>
          <div className={styles.widgets_container}>
            <div className={styles.total_habits_widget}>
              <p className={styles.widget_label}>Total Habits:</p>
              {!loading && <p className={styles.widget_data}>{rawHabits.length}</p>}
            </div>
            <div className={styles.total_check_widget}>
              <p className={styles.widget_label}>Total Check Ins:</p>
              <p className={styles.widget_data}>{totalCheckIns.length}</p>
            </div> 
            <div className={styles.avg_rate_widget}>
              <p className={styles.widget_label}>Avg. Check In Rate:</p>
              <p className={styles.widget_data}>{avg}%</p>
            </div>
          </div>
          <div className={styles.updates_container}>
            <Wrench/>
            <p>Streaks feature in progress</p>
          </div>
        </aside>

      </div>
      
    </div>
  )
}
