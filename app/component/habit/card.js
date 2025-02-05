import React, {useContext} from 'react'
import styles from "../../styles/habitCard.module.css"
import { XCircle, CheckCircle, DotsThreeVertical } from 'phosphor-react'
import { HabitContext } from '@/context/HabitContext'

export default function Card({name, type, color, id, isChecked}) {
  const {undoCheck, checkIn} = useContext(HabitContext)
  return (
    <article className={`${styles.habit_card} ${styles[color]} ${isChecked ? styles.completed : ""}`}>
        <div className={styles.card_header}>
            {type === "START" ? <CheckCircle/> : <XCircle/>}
            <p className={styles.card_title}>{name}</p>
            <button className={styles.modal_btn}>
              <DotsThreeVertical/>
            </button>
        </div>
        {isChecked ? 
          <button className={styles.undo_check_btn} onClick={() => undoCheck(id)}>Undo</button>
          : <button className={styles.check_in_btn}  onClick={() => checkIn(id)}>Check In</button> 
        }
    </article>
  )
}
