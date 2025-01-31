"use client"
import React, {useState, useEffect} from 'react'
import styles from "../../styles/myHabits.module.css"
import { fetchHabitsAPI } from '@/app/api/protected/habit/HabitCalls'
import Card from '@/app/component/habit/card'
import ClientLoading from '@/app/component/ClientLoading'


export default function MyHabits() {
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
    <div className={`${styles.my_habits_page} page`}>
      <header className={styles.my_habits_header}>
        <h1>My Habits</h1>
        <div className={styles.my_habits_toolbar}>
          <select>View All</select>
          <select>Filter By</select>
        </div>
      </header>
      <ul className={styles.habit_cards_container}>
        {loading ? (
          <ClientLoading/>
        ) : habits && habits.length > 0 ? (
          habits.map(habit => {
            return (
              <Card
                key={habit.id}
                name={habit.name}
                type={habit.type}
                color={habit.color}
                id={habit.id}
              />
            )
          })
        ) : (
          <p>No Habits Created</p>
        )

        }

      </ul>

      
    </div>
  )
}

