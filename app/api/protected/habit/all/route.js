import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"

export async function GET (request) {
    try {
        // validate token here (removed middleware)
        const authHeader = request.headers.get("Authorization")
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("You Must Be Logged In")
            return NextResponse.json({error: "You Must Be Logged In"}, {status: 401})
        }
        const token = authHeader.split(" ")[1]
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        const extractedId = verified.id

        const prisma = new PrismaClient()
        const habits = await prisma.habit.findMany({
            where: {
                userId: extractedId
            }
        })
        if (!habits) {
            return NextResponse.json({error: "No Habits Exist"})
        }
        return NextResponse.json({habits}, {status: 200 })
    } catch (error) {
        console.error("Error Fetching Habits", error)
        return NextResponse.json({error: "Failed to fetch habits"}, {status: 500})
    }
}