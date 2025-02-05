"use client"
import React, {useContext, useState, useEffect, useMemo} from 'react'
import { AuthContext } from '@/context/AuthContext'
import { HabitContext } from '@/context/HabitContext'
import HabitForm from '../component/HabitForm'
import styles from "../styles/dashboard.module.css"
import ClientLoading from '@/app/component/ClientLoading'
import CheckListWidget from '../component/dashboard/CheckListWidget'
import ProgressWidget from '../component/dashboard/ProgressWidget'
import {format} from 'date-fns'



export default function Dashboard () {
  const {authUser} = useContext(AuthContext)
  const {
    progressWindow, 
    setProgressWindow, 
    setWindowOffset, 
    windowOffset, 
    getTimeFrame, 
    checkIn, 
    undoCheck,
    processedHabits,
    loading
  } = useContext(HabitContext)
  const [formVisible, setFormVisible] = useState(false)

  // FORMAT TIME FRAME FOR UI
  const formatTimeFrame = (start, end) => {
    return `${format(start, "MM/dd")} - ${format(end, "MM/dd")}`
  }

  // CHECKLIST COMPONENT FILTERING
  const date = new Date()
  const today = date.toLocaleString("en-US", {weekday: "short"})
  const todayHabits = useMemo(() => {
    if (!processedHabits) return []
    return processedHabits.filter(habit => habit.frequency === "DAILY" || habit.daysOfWeek.includes(today))
  }, [processedHabits, today])
 

  return (
    <div className={`${styles.dashboard_page} page`}>

      <header className={styles.dashboard_header}>
        <h1>Hi there, {authUser.firstName}!</h1>
      </header>
  
      <div className={styles.dashboard_main_content}>
        <div className={styles.dashboard_main_widgets_container}>
          {loading 
            ? <ClientLoading/> 
            : <ProgressWidget 
                toggleForm={() => setFormVisible(true)} 
                formattedWindow={formatTimeFrame(getTimeFrame.start, getTimeFrame.end)}
              />
          }
        </div>

        <aside className={styles.dashboard_side_widgets_container}>
          {loading 
            ?  <ClientLoading/> 
            : <CheckListWidget 
                habits={todayHabits} 
              /> 
          }
        </aside>
      </div>

      {formVisible && <HabitForm onClose={() => setFormVisible(false)} status={formVisible}/>}
    </div>
  )
}


