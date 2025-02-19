"use client"
import React, {useState, useContext} from 'react'
import styles from "../styles/logreg.module.css"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/context/AuthContext'
import Alert from './Alert'
const LoginRegForm = ({type}) => {

    const [firstName, setFirstName] = useState("")
    const [username, setUsername] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const {login, register} = useContext(AuthContext)
    const [alert, setAlert] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    const triggerAlert = (message, type) => {
        setAlert({message, type})
    }


    const handleRegister = async(e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const response = await register(firstName, lastName, username, password)
            router.push("/")
            setFirstName("")
            setLastName("")
            setUsername("") 
            setPassword("")
          
        } catch (error) {
            setSubmitting(false)
            triggerAlert(error.message, "Failure")
            console.error("Error submitting form:", error)
        } finally {
            setSubmitting(false)
        }
    } 

    const handleLogin = async(e) => {
        setSubmitting(true)
        e.preventDefault()
        try {
            const response = await login(username, password)
            router.push("/")
            setUsername("")
            setPassword("")
            
        } catch (error) {
            setSubmitting(false)
            triggerAlert(error.message, "Failure")
            console.error(error)
        } finally {
            setSubmitting(false)
        }
    }

  return (
    <>
        {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)}/>}
        {type === "login" ? 
            
            <form className={`${styles.logreg_form} ${styles.login_form} ${submitting ? `${styles.waiting}` : ""}`} onSubmit={handleLogin}>
                <label>Username 
                    <span 
                        className={`
                            ${styles.mobile_error}
                            ${alert && alert.message === "Username Does Not Exist" ? styles.active_error : ""}
                        `}
                    >
                        Username Doesn't Exist
                    </span>
                </label>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Password 
                    <span 
                        className={`
                            ${styles.mobile_error}
                            ${alert && alert.message === "Incorrect Password" ? styles.active_error : ""}
                        `}
                    >
                    Password Incorrect
                    </span>
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={submitting}>Login</button>
                <p className={styles.logreg_form_message}>
                    Don't have an account? Click <Link href="/register">here</Link> to sign up
                </p>
            </form>
        : 
            <form  className={`${styles.logreg_form} ${styles.register_form}`} onSubmit={handleRegister}>
                <label>First Name</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <label>Last Name</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <label>Username 
                    <span className={`
                            ${styles.mobile_error}
                            ${alert && alert.message === "Username Already Exists" ? styles.active_error : ""}
                        `}
                    >
                        Username Already Taken
                    </span>
                </label>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={submitting}>Join</button>
                <p className={styles.logreg_form_message}>
                    Already have an account? Click <Link href="/login">here</Link> to login
                </p>
            </form>}
    </>
  )
}

export default LoginRegForm
