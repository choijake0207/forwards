export async function fetchUserAPI() {
    try {
        const token = localStorage.getItem("token")
        const response = await fetch("/api/protected/user/fetch", {
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
        return data
    } catch (error) {
        console.error("Error Fetching User", error)
        throw error
    }
}

