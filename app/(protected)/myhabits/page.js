"use client"
import React, {useState, useEffect} from 'react'
import styles from "../../styles/myHabits.module.css"
import { fetchHabitsAPI } from '@/app/api/protected/habit/HabitCalls'


export default function MyHabits() {
  const [habits, setHabits] = useState([])
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetchHabitsAPI()
        setHabits(response)
        console.log(response)
      } catch (error) {
        console.error("error fetching habits", error)
      }
    }
    fetchHabits()
  }, [])


  return (
    <div className={styles.my_habits_page}>

      
    </div>
  )
}

