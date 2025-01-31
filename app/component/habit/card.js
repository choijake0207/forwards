import React from 'react'
import styles from "../../styles/habit.module.css"
import { XCircle, CheckCircle } from 'phosphor-react'
export default function Card({name, type, color, createdAt, status, id}) {
  return (
    <article className={`${styles.habit_card} ${styles[color]}`}>
        <div className={styles.card_header}>
            {type === "START" ? <CheckCircle/> : <XCircle/>}
            <h1 className={styles.card_title}>{name}</h1>
        </div>
    </article>
  )
}
