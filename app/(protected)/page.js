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
import { Plus } from 'phosphor-react'






export default function Dashboard () {
  const {authUser} = useContext(AuthContext)
  const [formVisible, setFormVisible] = useState(false)
  const [habits, setHabits] = useState(null)
  const [loading, setLoading] = useState(true)

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

  return (
    <div className={`${styles.dashboard_page} page`}>
      <header className={styles.dashboard_header}>
        <h1>Welcome, {authUser.firstName}</h1>
      </header>
      <div className={styles.dashboard_toolbar}>
        <button onClick={() => setFormVisible(!formVisible)} className={styles.form_toggle_btn}><Plus/> Create Habit</button>

      </div>
      <div className={styles.dashboard_main_content}>
        <div className={styles.dashboard_main_widgets_container}>
          <ProgressWidget/>
          {loading ? <ClientLoading/> : <HabitList habits={habits}/>}
        </div>
        <aside className={styles.dashboard_side_widgets_container}>
          {loading ?  <ClientLoading/> :<CheckListWidget habits={todayHabits}/> }
        </aside>
      </div>
      {formVisible && <HabitForm onClose={() => setFormVisible(false)} status={formVisible}/>}
    </div>
  )
}


