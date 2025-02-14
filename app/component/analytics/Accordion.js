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
                                <div className={styles.streaks_data}>
                                    <p className={styles.data_label}>Longest Streak:</p>
                                    <p className={styles.data_display}>
                                        Coming Soon
                                    </p>
                                </div>
                                <div className={styles.checkCt_data}>
                                    <p className={styles.data_label}>Total check ins:</p>
                                    <p className={styles.data_display}>{habit.checkIns.length}</p>
                                </div>
                                <div className={styles.checkRt_data}>
                                    <p className={styles.data_label}>Check in rate:</p>
                                    <p className={styles.data_display}>{Math.round((habit.checkIns.length / habit.days.length) * 100)}%</p>
                                </div>
                                <div className={styles.start_data}>
                                    <p className={styles.data_label}>Days Since Start:</p>
                                    <p className={styles.data_display}>fuck my avgina</p>
                                </div>
                                <div className={styles.freq_data}>
                                    <p className={styles.data_label}>Frequency:</p>
                                    <p className={styles.data_display}>{habit.frequency}</p>
                                </div>
                                <div className={styles.dow_data}>
                                    <p className={styles.data_label}>Days of the week:</p>
                                    {habit.daysOfWeek.map(day => { return (<p key={day}>{day}</p>)})}
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


