import React from 'react'
import styles from "../../styles/habitCard.module.css"
import { XCircle, CheckCircle, DotsThreeVertical } from 'phosphor-react'

export default function Card({name, type, color, id, lastCheck, handleCheckIn}) {
  const today = new Date().setHours(0, 0, 0, 0)
  let checked = lastCheck && new Date(lastCheck).setHours(0, 0, 0, 0) === today
  console.log(checked)

  return (
    <article className={`${styles.habit_card} ${styles[color]} ${checked ? styles.completed : ""}`}>
        <div className={styles.card_header}>
            {type === "START" ? <CheckCircle/> : <XCircle/>}
            <p className={styles.card_title}>{name}</p>
            <button className={styles.modal_btn}>
              <DotsThreeVertical/>
            </button>
        </div>
        <button className={styles.check_in_btn}  onClick={() => handleCheckIn(id)}>Check In</button>
    </article>
  )
}
