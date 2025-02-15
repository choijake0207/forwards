import React, {useState} from 'react'
import styles from "../../styles/analytics.module.css"
import {X, Check, CaretLeft} from "phosphor-react"

export default function Accordion({habits}) {

    const [openCard, setOpenCard] = useState(null)
    

  return (
    <div className={styles.accordion_container}>
        <h2>All Habits</h2>
        <ul className={styles.analytics_accordion}>
            {
                habits.map((habit, index) =>  {
                    return (
                        <li key={habit.id} className={`${styles.accordion_card} ${openCard === index ? styles.open : ""}`}>

                            <div className={`${styles.card_header} ${styles[habit.color]}`}>
                                <p className={styles.card_title}>
                                    {habit.type === "START" ? <Check/> : <X/>}
                                    {habit.name}
                                </p>
                                <button 
                                    className={styles.expand_btn}
                                    onClick={() => openCard === index ? setOpenCard(null) : setOpenCard(index)}
                                >   
                                    <CaretLeft/>
                                </button>
                            </div>

                            <div className={`${styles.data_table}`}>
                                <div className={styles.checkCt_data}>
                                    <p className={styles.data_label}>Check Ins:</p>
                                    <p className={styles.data_display}>{habit.checkIns.length}</p>
                                </div>
                                <div className={styles.checkRt_data}>
                                    <p className={styles.data_label}>Rate:</p>
                                    <p className={styles.data_display}>{Math.round((habit.checkIns.length / habit.days.length) * 100)}%</p>
                                </div>
                                <div className={styles.start_data}>
                                    <p className={styles.data_label}>Days Since Start:</p>
                                    <p className={styles.data_display}>{Math.round((new Date() - new Date(habit.createdAt))/86400000)}</p>
                                </div>
                                <div className={styles.freq_data}>
                                    <p className={styles.data_label}>Frequency:</p>
                                    <p className={styles.data_display}>{habit.frequency.charAt(0) + habit.frequency.slice(1).toLowerCase()}</p>
                                </div>
                                <div className={styles.dow_data}>
                                    <p className={styles.data_label}>Days:</p>
                                    <p className={styles.data_display}>
                                        {habit.frequency === "DAILY" ? "Everyday" 
                                            : habit.daysOfWeek.length === 1
                                                ? habit.daysOfWeek[0]
                                                : habit.daysOfWeek.join(", ")
                                        }
                                    </p>
                                </div>
                                
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    </div>
  )
}


