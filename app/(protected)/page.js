"use client"
import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '@/context/AuthContext'
import HabitForm from '../component/HabitForm'
import styles from "../styles/dashboard.module.css"





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
      <h1>Welcome To Dashboard {authUser.firstName}</h1>
      <button onClick={() => setFormVisible(!formVisible)}>Form</button>
      {formVisible && <HabitForm onClose={() => setFormVisible(false)}/>}
    </div>
  )
}


