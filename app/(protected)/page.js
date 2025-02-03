"use client"
import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '@/context/AuthContext'
import HabitForm from '../component/HabitForm'
import styles from "../styles/dashboard.module.css"
import { fetchHabitsAPI } from '@/app/api/protected/habit/HabitCalls'
import ClientLoading from '@/app/component/ClientLoading'
import CheckListWidget from '../component/dashboard/CheckListWidget'
import ProgressWidget from '../component/dashboard/ProgressWidget'
import HabitList from '../component/dashboard/HabitList'
import { createCheckInAPI } from '../api/protected/checkin/CheckInCalls'






export default function Dashboard () {
  const {authUser} = useContext(AuthContext)
  const [formVisible, setFormVisible] = useState(false)
  const [habits, setHabits] = useState(null)
  const [loading, setLoading] = useState(true)
// initial fetch all habits
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetchHabitsAPI()
        setHabits(response)
        console.log(response)
      } catch (error) {
        console.error("error fetching habits", error)
      } finally {
        setLoading(false)
      }
    }
    fetchHabits()
  }, [])

  // check in filtering
  const date = new Date()
  const today = date.toLocaleString("en-US", {weekday: "short"})
  let todayHabits = habits && habits.filter(habit => habit.frequency === "DAILY" || habit.daysOfWeek.includes(today))
  console.log("Filtered:",todayHabits)

  // handle checkins
  const checkIn = async (habitId) => {
    const previousHabits = [...habits]
    try {
      //optimistic render
      setHabits(prev => 
        prev.map(habit => 
          habit.id === habitId ? {...habit, lastCheck: new Date()} : habit
        )
      )
      const response = await createCheckInAPI({habitId})
      console.log(response)
    } catch (error) {
      console.error("Error Checking In", error)
      // revert optimistic render
      setHabits(previousHabits)
    }
  }

  return (
    <div className={`${styles.dashboard_page} page`}>
      <header className={styles.dashboard_header}>
        <h1>Hi there, {authUser.firstName}!</h1>
      </header>
  

      <div className={styles.dashboard_main_content}>
        <div className={styles.dashboard_main_widgets_container}>
          <ProgressWidget toggleForm={() => setFormVisible(true)}/>
          {/* {loading ? <ClientLoading/> : <HabitList habits={habits}/>} */}
        </div>
        <aside className={styles.dashboard_side_widgets_container}>
          {loading ?  <ClientLoading/> :<CheckListWidget habits={todayHabits} checkIn={checkIn}/> }
        </aside>
      </div>
      {formVisible && <HabitForm onClose={() => setFormVisible(false)} status={formVisible}/>}
    </div>
  )
}


