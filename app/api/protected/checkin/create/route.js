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
        const {habitId} = await request.json()
        const prisma = new PrismaClient()
        const newCheckIn = await prisma.checkIn.create({
            data: {
                habitId: habitId,
                userId: verified.id,
                date: new Date()

            }
        })

        return NextResponse.json({
            message: "Checked In Succesfully",
            checkIn: newCheckIn
        })
    } catch (error) {
        console.error("Failed To Check In", error)
        return NextResponse.json({error: "Failed To Check In"}, {status: 500})
    }
}