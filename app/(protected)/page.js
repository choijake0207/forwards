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
    fetchHabits,
    rawHabits,
    getTimeFrame, 
    processedHabits,
    loading
  } = useContext(HabitContext)
  const [formVisible, setFormVisible] = useState(false)


  // FORMAT TIME FRAME FOR UI
  const formatTimeFrame = (start, end) => {
    return `${format(start, "M/d")} - ${format(end, "M/d")}`
  }

  // Greeting Formatting
  let formattedName = authUser.firstName.charAt(0).toUpperCase() + authUser.firstName.slice(1).toLowerCase()
  let time = new Date().getHours()
  const generateGreeting = () => {
    if (time < 12 && time > 3) {
      return <h1>Good Morning, {formattedName} <img src="/sun.png"/></h1>
    } else if (time >= 12 && time < 18 ) {
      return <h1>Good Afternoon, {formattedName} <img src="/sun(1).png"/></h1>
    } else {
      return <h1>Good Evening, {formattedName} <img src="/moon.png"/></h1>
    }
  }
  
 

  return (
    <div className={`${styles.dashboard_page} page`}>

      <header className={styles.dashboard_header}>
        {generateGreeting()}
      </header>
  
      {loading ? <ClientLoading/> 
        :
        <div className={styles.dashboard_main_content}>
          <div className={styles.dashboard_main_widgets_container}>

              <ProgressWidget 
                  toggleForm={() => setFormVisible(true)} 
                  formattedWindow={formatTimeFrame(getTimeFrame.start, getTimeFrame.end)}
                />
            
          </div>

          <aside className={styles.dashboard_side_widgets_container}>
          
              <CheckListWidget 
                  habits={processedHabits} 
                /> 
            
          </aside>
        </div>
      }

      {formVisible && <HabitForm onClose={() => setFormVisible(false)} status={formVisible}/>}
    </div>
  )
}


