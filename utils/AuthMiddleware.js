import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
require("dontenv").config()

export async function validateToken (request) {
    try {
        const token = request.headers.get("Authorization")
        if (!token) {
            return new Response(JSON.stringify({error: "You Must Be Logged In"}), {status: 401})
        }
        const validation = jwt.verify(token, process.env.JWT_SECRET)
        const newHeaders = new Headers(request.headers)
        newHeaders.set("userId", validation.id)
        return NextResponse.next({request: {headers: newHeaders}})
    
    } catch (error) {
        return NextResponse.json({error: "Invalid Token"}, {status: 403})
    }
}   

export const config = {
    matcher: "/api/protected"
}