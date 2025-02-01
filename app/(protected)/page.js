"use client"
import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '@/context/AuthContext'
import HabitForm from '../component/HabitForm'
import styles from "../styles/dashboard.module.css"
import { fetchHabitsAPI } from '@/app/api/protected/habit/HabitCalls'
import ClientLoading from '@/app/component/ClientLoading'
import CheckListWidget from '../component/dashboard/CheckListWidget'
import ProgressWidget from '../component/dashboard/ProgressWidget'






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
  return (
    <div className={`${styles.dashboard_page} page`}>
      <header>
        <h1>Here's Your Dashboard, {authUser.firstName}</h1>
      </header>
      <div className={styles.dashboard_main_content}>
        <ProgressWidget/>
        <aside className={styles.dashboard_side_widgets_container}>
          {habits ? <CheckListWidget habits={habits}/> : <ClientLoading/>}
        </aside>
      </div>
      <button onClick={() => setFormVisible(!formVisible)}>Form</button>
      {formVisible && <HabitForm onClose={() => setFormVisible(false)}/>}
    </div>
  )
}


