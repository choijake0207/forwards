"use client"
import {createContext, useState, useEffect} from "react"

export const AuthContext = createContext()
export const AuthProvider = ({children}) => {
    const [authUser, setAuthUser] = useState({
        id: "",
        firstName: "",
        username: "",
        status: false
    })

    const login = async (username, password) => {
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, password})
            })
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error)
            }
            const {token, auth} =  await response.json()
            localStorage.setItem("token", token)
            setAuthUser({
                id: auth.id,
                username: auth.username,
                firstName: auth.firstName,
                status: true
            })
           
        } catch (error) {
            console.error("Error logging in:", error)
            throw error
        }
    }

    const register = async(firstName, lastName, username, password) => {
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({firstName, lastName, username, password})
            })
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error)
            
            }
            const {token, auth} =  await response.json()
            localStorage.setItem("token", token)
            setAuthUser({
                id: auth.id,
                username: auth.username,
                firstName: auth.firstName,
                status: true
            })
        } catch (error) {
            console.error("Error submitting form:", error)
            throw error
        }
    }
    return (
        <AuthContext.Provider value={{authUser, login, register}}>
            {children}
        </AuthContext.Provider>
    )
}