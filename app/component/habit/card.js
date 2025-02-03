import React from 'react'
import styles from "../../styles/habitCard.module.css"
import { XCircle, CheckCircle, DotsThreeVertical } from 'phosphor-react'
export default function Card({name, type, color, id}) {
  return (
    <article className={`${styles.habit_card} ${styles[color]}`}>
        <div className={styles.card_header}>
            {type === "START" ? <CheckCircle/> : <XCircle/>}
            <p className={styles.card_title}>{name}</p>
            <button className={styles.modal_btn}>
              <DotsThreeVertical/>
            </button>
        </div>
        <button className={styles.check_in_btn}>Check In</button>
    </article>
  )
}
