import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET (request) {
    try {
        const prisma = new PrismaClient()
        const extractedId = request.headers.userId
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