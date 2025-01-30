
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