import React, {useContext, useRef, useState, useEffect} from 'react'
import styles from "../../styles/habitCard.module.css"
import { XCircle, CheckCircle, DotsThreeVertical, ArrowCounterClockwise } from 'phosphor-react'
import { HabitContext } from '@/context/HabitContext'

export default function Card({name, type, color, id, isChecked}) {
  const {undoCheck, checkIn} = useContext(HabitContext)
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <article className={`${styles.habit_card} ${styles[color]} ${isChecked ? styles.completed : styles.incomplete}`}>
        <div className={styles.card_header}>
            {type === "START" ? <CheckCircle/> : <XCircle/>}
            <p className={styles.card_title}>{name}</p>
            <button className={styles.modal_btn} onClick={() => setModalOpen(true)}>
              <DotsThreeVertical/>
            </button>
        </div>
        {isChecked ? 
          <button className={styles.undo_check_btn} onClick={() => undoCheck(id)}><ArrowCounterClockwise/>Undo</button>
          : <button className={styles.check_in_btn}  onClick={() => checkIn(id)}>Check In</button> 
        }
        {
          modalOpen && <CardModal isOpen={modalOpen} onClose={() => setModalOpen(false)}/>
        }
    </article>
  )
}

function CardModal ({isOpen, onClose}) {
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
      <button>Edit Habit</button>
      <button>Delete Habit</button>
    </div>

  )
}
