import jwt from "jsonwebtoken"
require("dotenv").config()

export async function POST(request) {
    const authHeaders = request.headers.get("Authorization")
    const token = authHeaders.split(" ")[1]
    if (!token) {
        return new Response(JSON.stringify({error: "You Must Be Logged In"}), {status: 401})
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        return new Response(
            JSON.stringify(
                {user: {id: verified.id, username: verified.username, firstName: verified.firstName} },
                {status: 200}
            )
        )
    } catch (error) {
        return new Response(JSON.stringify({error: "Invalid Token"}), {status: 401})
    }
}