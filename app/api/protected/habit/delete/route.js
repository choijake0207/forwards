import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"

export async function DELETE (request) {
    try {
        const authHeader = request.headers.get("Authorization")
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("Missing or Invalid Token")
            NextResponse.json({error: "Missing or Invalid Token"})
        }
        const token = authHeader.split(" ")[1]
        let verified
        try {
            verified = jwt.verify(token, process.env.JWT_SECRET)
            console.log("verified")
        } catch (error) {
            console.error("JWT verification failed", error)
            return NextResponse.json({error: "Invalid Token"}, {status: 403})
        }
        const extractedId = verified.id
        const {habitId} = await request.json()
        const prisma = new PrismaClient()

        const habit = await prisma.habit.findFirst({
            where: {
                id: habitId,
                userId: extractedId
            }
        })
        console.log(habit)

        if (!habit) {
            NextResponse.json({error: "Habit Doesn't Exist"})
        }

        await prisma.habit.delete({
            where: {
                id: habit.id
            }
        })

        return NextResponse.json({message: "Habit Deleted Succesfully"})
    } catch (error) {
        console.error("Failed To Delete Habit", error)
        NextResponse.json({error: "Failed To Delete Habit"}, {status: 500})
    }

}