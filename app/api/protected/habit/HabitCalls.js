
// Create New Habit
export async function createHabitAPI(habit) {
    try {
        const response = await fetch("/api/protected/habit/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(habit)
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error)
        }

    } catch (error) {
        console.error("Error Creating Habit", error)
        throw console.error();
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
                "Authorization": token
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
        throw console.error()
    }
}