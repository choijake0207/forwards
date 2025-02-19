import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"

export async function DELETE (request) {
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
            console.log("token verified")
        } catch (error) {
            console.error("JWT verification failed", error)
            return NextResponse.json({error: "Invalid Token"})
        }
        const {habitId, stringToday} = await request.json()
        // const today = new Date().setHours(0, 0, 0, 0)
        // const normalizedToday = new Date(today) 
        const prisma = new PrismaClient()
   

        const target = await prisma.checkIn.findFirst({
            where: {
                habitId: habitId,
                userId: verified.id,
                date: stringToday
            }
        })
        await prisma.checkIn.delete({
            where: {
                id: target.id
            }
        })
        await prisma.habit.update({
            where: {
                id: habitId
            },
            data: {
                lastCheck: null
            }
        })
        return NextResponse.json({message: "Check in reverted succesfully"})
    } catch (error) {
        console.error("Failed To Undo Check In", error)
        return NextResponse.json({error: "Failed To Undo Check In"}, {status: 500})
    }
}