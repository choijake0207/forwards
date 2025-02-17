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

    const triggerAlert = (message, type) => {
        setAlert({message, type})
    }


    const handleRegister = async(e) => {
        e.preventDefault()
        try {
            const response = await register(firstName, lastName, username, password)
            setFirstName("")
            setLastName("")
            setUsername("")
            setPassword("")
            router.push("/")
        } catch (error) {
            triggerAlert(error.message, "Failure")
            console.error("Error submitting form:", error)
        }
    } 

    const handleLogin = async(e) => {
        e.preventDefault()
        try {
            const response = await login(username, password)
            setUsername("")
            setPassword("")
            router.push("/")
        } catch (error) {
            triggerAlert(error.message, "Failure")
            console.error(error)
        }
    }

  return (
    <>
        {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)}/>}
        {type === "login" ? 
            
            <form className={`${styles.logreg_form} ${styles.login_form}`} onSubmit={handleLogin}>
                <label>Username</label>
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
                <button type="submit">Login</button>
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
                <label>Username</label>
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
                <button type="submit">Join</button>
                <p className={styles.logreg_form_message}>
                    Already have an account? Click <Link href="/login">here</Link> to login
                </p>
            </form>}
    </>
  )
}

export default LoginRegForm
