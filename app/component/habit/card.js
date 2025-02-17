import React, {useContext, useRef, useState, useEffect} from 'react'
import styles from "../../styles/habitCard.module.css"
import { X, Check, DotsThreeVertical, ArrowCounterClockwise, Trash, Wrench } from 'phosphor-react'
import { HabitContext } from '@/context/HabitContext'

export default function Card({name, type, color, id, isChecked, isToday}) {
  const {undoCheck, checkIn, deleteHabit} = useContext(HabitContext)
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <article className={`${styles.habit_card} ${styles[color]} ${isChecked ? styles.completed : styles.incomplete} ${isToday ? styles.active : styles.inactive}`}>
        <div className={styles.card_header}>
            {type === "START" ? <Check/> : <X/>}
            <p className={styles.card_title}>{name}</p>
            <button className={styles.modal_btn} onClick={() => setModalOpen(true)}>
              <DotsThreeVertical/>
            </button>
        </div>
        {isChecked ? 
          <button className={styles.undo_check_btn}  onClick={() => undoCheck(id)}><ArrowCounterClockwise/>Undo</button>
          : <button className={styles.check_in_btn}  disabled={isToday === false} onClick={() => checkIn(id)}>Check In</button> 
        }
        {
          !isToday && <p className={styles.inactive_message}>No Check In Today</p>
        }
        {
          modalOpen && <CardModal isOpen={modalOpen} onClose={() => setModalOpen(false)} deleteHabit={deleteHabit} id={id}/>
        }
    </article>
  )
}

function CardModal ({isOpen, onClose, deleteHabit, id}) {
  const modalRef = useRef(null)
  useEffect(() => {
    function handleOutsideClick (event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }
      if (isOpen) {
        document.addEventListener("mousedown", handleOutsideClick)
      } else {
        document.removeEventListener("mousedown", handleOutsideClick)
      }
      return () => {
        document.addEventListener("mousedown", handleOutsideClick)
      }
    
  }, [isOpen, modalRef, onClose])
  return (
    <div className={styles.card_modal} ref={modalRef}>
      <button className={styles.delete_btn} onClick={() => deleteHabit(id)}><Trash/>Delete Habit</button>
    </div>

  )
}
