import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"

export async function GET (request) {
    try {
        const authHeader = request.headers.get("Authorization")
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("You Must Be Logged In")
            return NextResponse.json({error: "You Must Be Logged In"})
        }
        const token = authHeader.split(" ")[1]
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        const extractedId = verified.id

        const prisma = new PrismaClient()
        const {habitId} = await request.json()

        const habit = await prisma.habit.findFirst({
            where: {
                userId: extractedId,
                id: habitId
            },
            include: {
                checkIns: true
            }
        })
        if (!habit) {
            return NextResponse.json({error: "Habit Doesn't Exist"})
        }
        return NextResponse.json({habit}, {status:200})

    } catch (error) {
        console.error("Error Fetching Habit", error)
        return NextResponse.json({error: "Failed To Fetch Habit"}, {status: 500})
    }

}