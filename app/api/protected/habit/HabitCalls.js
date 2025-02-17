
// Create New Habit
export async function createHabitAPI(habit) {
    try {
        const token = localStorage.getItem("token")
        const response = await fetch("/api/protected/habit/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(habit)
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error)
        }
        const data = await response.json()
        return data

    } catch (error) {
        console.error("Error Creating Habit", error)
        throw error
    } 
}

// Fetch All Habits by User
export async function fetchHabitsAPI() {
    try {
        const token = localStorage.getItem("token")
        const response = await fetch("/api/protected/habit/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error)
        }
        const data = await response.json()
        return data.habits
    } catch (error) {
        console.error("Failed To Fetch Habits", error)
        throw error
    }
}

export async function deleteHabitAPI (habitId) {
    try {
        const token = localStorage.getItem("token")
        const response = await fetch("/api/protected/habit/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({habitId})
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Failed To Delete Habit", error)
        throw error
    }
}
// Fetch Single Habit By Id (considering just filtering from habitContext)
// export async function fetchSingleHabitAPI(habitId) {
//     try {
//         const token = localStorage.getItem("token")
//         const response = await fetch("/api/protected/habit/single", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             },
//             body: JSON.stringify({habitId})
//         })
//         if (!response.ok) {
//             const errorData = await response.json()
//             throw new Error(errorData.error)
//         }
//         const data = await response.json()
//         return data

//     } catch (error) {
//         console.error("Error Fetching Habit", error)
//         throw console.error()
//     }
// }