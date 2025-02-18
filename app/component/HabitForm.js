import React, {useState, useContext} from 'react'
import styles from "../styles/habitForm.module.css"
import { XCircle, CheckCircle, SunDim, X } from 'phosphor-react'
import { createHabitAPI } from '../api/protected/habit/HabitCalls'
import { AuthContext } from '@/context/AuthContext'
import { HabitContext } from '@/context/HabitContext'
import { useRouter } from 'next/navigation'

const HabitForm = ({onClose, status}) => {
    const {authUser} = useContext(AuthContext)
    const {createHabit} = useContext(HabitContext)
    const [step, setStep] = useState(1)
    const router = useRouter()
    const colorScheme = ["red", "blue", "green", "yellow", "orange", "pink", "purple"]
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const [habitForm, setHabitForm] = useState({
        name: "",
        color: "red",
        type: "",
        frequency: "",
        daysOfWeek: []
    })
    const [submitting, setSubmitting] = useState(false)
    const step1Valid = habitForm.name.trim() !== "" && habitForm.type !== ""
    const step2Valid = () => {
        if (habitForm.frequency === "") {
            return false
        }
        if (habitForm.frequency === "WEEKLY" && habitForm.daysOfWeek.length !== 1) {
            return false
        }
        if (habitForm.frequency === "CUSTOM" && habitForm.daysOfWeek.length === 0) {
            return false
        }
        return true
    }
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
    const handleClose = (e) => {
        e.preventDefault()
        onClose()
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
    const handleFrequencySelection = (e) => {
        setHabitForm({...habitForm, frequency: e.target.value, daysOfWeek: []})
    }
    const handleDaySelection = (e, day) => {
        e.preventDefault()
        setHabitForm(prev => {
            if (prev.frequency === "DAILY") {
                return {prev}
            } else if (prev.frequency === "WEEKLY") {
                return {...prev, daysOfWeek: prev.daysOfWeek.includes(day) ? [] : [day]}
            } else {
                let days
                if (prev.daysOfWeek.includes(day)) {
                    days = prev.daysOfWeek.filter(d => d  !== day)
                } else {
                    days = [...prev.daysOfWeek, day]
                }
                const updatedFreq = days.length === 7 && prev.frequency === "CUSTOM" ? "DAILY" : prev.frequency
                const updatedDays = updatedFreq === "DAILY" ? [] : days
                return {
                    ...prev,
                    daysOfWeek: updatedDays,
                    frequency: updatedFreq
                }
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        const newHabit = {
            ...habitForm,
            userId: authUser.id
        }
        const response = await createHabit(newHabit)
        setSubmitting(false)
        onClose()
    }

  return (
    <div className={styles.habit_form_overlay}>
        <div className={`${styles.habit_form_container} ${status && `${styles.visible}`}`}>
           { step === 1 ? (
                    <form className={styles.habit_form_step_1}>
                     
                            <header className={styles.step_header}>
                       
                                <p>Step 1 of 2</p>
                                <h1>Create A New Habit</h1>
                    
                                <button onClick={handleClose} className={styles.habit_form_exit_btn}><X/></button>
                            
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
                        <button onClick={handleClose} className={styles.habit_form_exit_btn}>X</button>
                    </header>
                    <label>Your habit:</label>
                    <p className={`${styles.step_2_display} ${styles[habitForm.color]}`}>{habitForm.type === "START" ? <CheckCircle/> : <XCircle/>}{habitForm.name}</p>
                    <label>Choose frequency</label>
                    <select className={styles.habit_form_freq_selector} value={habitForm.frequency} onChange={handleFrequencySelection}>
                        <option value="">Select Frequency</option>
                        <option value="DAILY">Daily</option>
                        <option value="WEEKLY">Weekly</option>
                        <option value="CUSTOM">Custom</option>
                    </select>
                    <div className={`${styles.habit_form_days_selector}  ${habitForm.frequency === "DAILY" || habitForm.frequency === "" ? `${styles.disabled}` : ""}`}>
                        <label>Choose day(s) of week:</label>
                        <div className={styles.days_container}>
                            {days.map(d => {
                                return  (
                                    <button 
                                        onClick={(e) => handleDaySelection(e, d)}
                                        key={d}
                                        disabled={habitForm.frequency === "DAILY" || habitForm.frequency === ""}
                                        className={`${styles.habit_form_day_btn} ${habitForm.daysOfWeek.includes(d) || habitForm.frequency === "DAILY" ? `${styles.active_day}` : ""}`}
                                    >
                                        {d}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    <div className={styles.habit_form_btn_container}>
                        <button className={`${styles.habit_form_btn} ${styles.habit_form_btn_prev}`} disabled={submitting} onClick={prev}>Previous</button>
                        <button className={`${styles.habit_form_btn} ${styles.habit_form_btn_submit}`} disabled={!step2Valid() || submitting} onClick={handleSubmit}type="submit">Submit</button>
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
