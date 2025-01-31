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
    const [loading, setLoading] = useState(true)

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

    const logout = () => {
        localStorage.removeItem("token")
        setAuthUser({
            id: "",
            username: "",
            firstName: "",
            status: false
        })
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

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) {
                    throw new Error("No Token Found")
                }
                const response = await fetch("/api/auth/check", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (!response.ok) {
                    throw new Error("Unauthorized")
                }
                const data = await response.json()
                
                setAuthUser({
                    id: data.user.id,
                    firstName: data.user.firstName,
                    username: data.user.username,
                    status: true
                })
            } catch (error) {
                console.error("User Verification Failed", error)
                setAuthUser({
                    id: "",
                    firstName: "",
                    username: "",
                    status: false,
                })
            } finally {
                setLoading(false)
            }
        }
        verifyUser()
    }, [])

    return (
        <AuthContext.Provider value={{authUser, login, register, loading, logout}}>
            {children}
        </AuthContext.Provider>
    )
}