import React, {useState} from 'react'
import styles from "../styles/habitForm.module.css"
import { XCircle, CheckCircle } from 'phosphor-react'
import Image from 'next/image'


const HabitForm = () => {
    const [step, setStep] = useState(1)
    const colorScheme = ["red", "blue", "green", "yellow", "orange", "pink", "purple"]
    const [habitForm, setHabitForm] = useState({
        name: "",
        color: "red",
        type: "",
        frequency: "",
        daysOfWeek: []
    })
    const step1Valid = habitForm.name.trim() !== "" && habitForm.type !== ""
    const next = (e) => {
        e.preventDefault()
        if (step1Valid) {
            if (step === 1) {
                setStep(2)
            }
        } else {
            setFormStatus(false)
        }
    }
    const prev = (e) => {
        e.preventDefault()
        if (step === 2) {
            setStep(1)
        } 
    }
    const handleColorSelection = (color) => {
        setHabitForm({...habitForm, color: color})
    }
    const handleTypeSelection = (e, type) => {
        e.preventDefault()
        setHabitForm({...habitForm, type: type})
    }
    const handleNameSelection = (e) => {
        setHabitForm({...habitForm, name: e.target.value})
    }
  return (
    <div className={styles.habit_form_overlay}>
        <div className={styles.habit_form_container}>
           { step === 1 ? (
                    <form className={styles.habit_form_step_1}>
                     
                            <header className={styles.step_header}>
                       
                                <p>Step 1 of 2</p>
                                <h1>Create A New Habit</h1>
                    
                                <button className={styles.habit_form_exit_btn}>X</button>
                            
                            </header>
                            <label>Name your habit <span className={styles.input_character_limit}>15 characters max</span></label>
                            <input
                                type="text"
                                value={habitForm.name}
                                onChange={handleNameSelection}
                                maxLength={15}
                            />
                            <label>Select habit type</label>
                            <div className={styles.habit_form_type_container}>
                                <button 
                                    className={`${styles.habit_type_btn} ${styles.habit_type_start} ${habitForm.type === "START" && `${styles.active_type}`}`}
                                    onClick={(e) => handleTypeSelection(e, "START")}
                                >
                                    <span className={styles.habit_type_title}><CheckCircle className={styles.start_icon}/>Starting</span>
                                    <span className={styles.habit_type_desc}>For when you want to start something new</span>
                                </button>
                                <button 
                                    className={`${styles.habit_type_btn} ${styles.habit_type_quit} ${habitForm.type === "QUIT" && `${styles.active_type}`}`}
                                    onClick={(e) => handleTypeSelection(e, "QUIT")}
                                >
                                    <span className={styles.habit_type_title}><XCircle className={styles.quit_icon}/>Quitting</span>
                                    <span className={styles.habit_type_desc}>For when you want to quit something old</span>
                                </button>
                            </div>
                            <label>Choose a color</label>
                            <div className={styles.habit_form_color_selector}>
                                {
                                    colorScheme.map(c => {
                                        return (
                                            <div
                                                onClick={() => handleColorSelection(c)}
                                                key={c}
                                                className={`
                                                    ${styles.color_selector_option} 
                                                    ${styles[c]}
                                                    ${habitForm.color === c && `${styles.active_color}`}
                                                `}
                                            >
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <button disabled={!step1Valid} className={`${styles.habit_form_btn} ${styles.habit_form_btn_next}`} onClick={next}>Next</button>
                 
                    </form>

            ) : (
                <form className={styles.habit_form_step_2}>
                    <header className={styles.step_header}>
                        <p>Step 2 of 2</p>
                        <h1>Configure Your Habit</h1>
                        <button className={styles.habit_form_exit_btn}>X</button>
                    </header>
                    <label>Your habit:</label>
                    <p>{habitForm.type === "START" ? <CheckCircle/> : <XCircle/>}{habitForm.name}</p>
                    <label>Choose frequency</label>
                    <select>
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Custom</option>
                    </select>
                    <div className={styles.habit_form_btn_container}>
                        <button className={`${styles.habit_form_btn} ${styles.habit_form_btn_prev}`} onClick={prev}>Previous</button>
                        <button className={`${styles.habit_form_btn} ${styles.habit_form_btn_submit}`} type="submit">Submit</button>
                    </div>
                </form>
            )}
            <div className={styles.habit_form_image_container}>
                {
                    step === 1 ? 
                    <>
                        <img src="/lifestyle.png" className={styles.lifestyle_img} alt="lifestyle"/>

                        <img src="/freelancer.png" className={styles.freelancer_img} alt="freelancer"/>
                    </>
                    : 
                    <>
                        <img src="/alarm-clock.png" className={styles.alarmclock_img} alt="clock"/>
                    </>
                }
            </div>
        </div>
    </div>
  )
}

export default HabitForm
