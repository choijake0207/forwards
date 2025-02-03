

// create new checkin
export async function createCheckIn ({habitId}) {
    try {
        const token  = localStorage.getItem("token")
        const response = await fetch("/api/protected/checkin/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(habitId)
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error Checking In", error)
        throw console.error()
    }
}