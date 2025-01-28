import React, {useState} from 'react'
import styles from "../styles/logreg.module.css"
import Link from 'next/link'
import { useRouter } from 'next/router'


const LoginRegForm = ({type}) => {

    const [firstName, setFirstName] = useState("")
    const [username, setUsername] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({firstName, lastName, username, password})
            })
            const result = response.json()
            if (response.ok) {
                console.log(result.message)
                setFirstName("")
                setLastName("")
                setUsername("")
                setPassword("")
            } else {
                console.log("error")
            }
           
        } catch (error) {
            console.error("Error submitting form:", error)
        }
    }

  return (
    type === "login" ? 

        <form className={`${styles.logreg_form} ${styles.login_form}`}>
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
        </form>
  )
}

export default LoginRegForm
