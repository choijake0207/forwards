"use client"
import React, {useState, useContext} from 'react'
import styles from "../styles/logreg.module.css"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/context/AuthContext'

const LoginRegForm = ({type}) => {

    const [firstName, setFirstName] = useState("")
    const [username, setUsername] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const {login, register} = useContext(AuthContext)


    const handleRegister = async(e) => {
        e.preventDefault()
        try {
            const response = await register(firstName, lastName, username, password)
            console.log(response)
            setFirstName("")
            setLastName("")
            setUsername("")
            setPassword("")
            router.push("/")
        } catch (error) {
            console.error("Error submitting form:", error)
        }
    }

    const handleLogin = async(e) => {
        e.preventDefault()
        try {
            const response = await login(username, password)
            console.log(response)
            setUsername("")
            setPassword("")
            router.push("/")
        } catch (error) {
            console.error("Error logging in:", error)
        }
    }

  return (
    <>
       
        {type === "login" ? 

            <form className={`${styles.logreg_form} ${styles.login_form}`} onSubmit={handleLogin}>
                <label>Username</label>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                />
                <label>Last Name</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label>Username</label>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
