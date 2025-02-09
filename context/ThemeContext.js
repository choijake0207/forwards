"use client"
import React, {createContext, useState} from "react";

export const ThemeContext = createContext(null)

export const ThemeProvider = ({children}) => {

    const [darkMode, setDarkMode] = useState(true)

    const toggleMode = () => {
        setDarkMode(!darkMode)
        console.log(darkMode)

    }

    return (
        <ThemeContext.Provider value={{darkMode, toggleMode}}>
            {children}
        </ThemeContext.Provider>
    )
}