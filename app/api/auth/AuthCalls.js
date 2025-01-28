
export const login = async (username, password) => {
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
        return await response.json()
    } catch (error) {
        console.error("Error logging in:", error)
        throw error
    }
}

export const register = async(firstName, lastName, username, password) => {
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
        return await response.json()
    } catch (error) {
        console.error("Error submitting form:", error)
        throw error
    }
}