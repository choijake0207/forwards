import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"

export async function POST (request) {
    try {

        const authHeader = request.headers.get("Authorization")
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("Missing or Invalid Token")
            return NextResponse.json({error: "Missing or Invalid Token"})
        }
        const token = authHeader.split(" ")[1]
        let verified
        try {
            verified = jwt.verify(token, process.env.JWT_SECRET)
            console.log("Token Verified")
        } catch (error) {
            console.error("JWT verification failed", error)
            return NextResponse.json({error: "Invalid Token"}, {status: 403})
        }

        const {name, color, type, frequency, daysOfWeek=[], userId} = await request.json()
        const prisma = new PrismaClient()
        // validate req
        if (!name || !color || !type || !frequency || !userId) {
            return NextResponse.json({error: "Missing Form Fields"}, {status: 400})
        }
        const newHabit = await prisma.habit.create({
            data: {
                userId: userId,
                name: name,
                color: color,
                type: type,
                frequency: frequency,
                daysOfWeek: daysOfWeek || [],
                weeklyGoal: frequency === "DAILY" ? 7 : daysOfWeek.length

            }
        })

        return NextResponse.json({
            message: "Habit Succesfully Created",
            habit: newHabit
        })

    } catch (error) {
        console.error("Failed To Create New Habit", error)
        return NextResponse.json({error: "Failed To Create New Habit"}, {status: 500})
    }
}