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
        const user = await prisma.user.findFirst({
            where: {
                id: extractedId
            }
        })
        if (!user) {
            return NextResponse.json({message: "User Does Not Existt"})
        }
        return NextResponse.json({user}, {status: 200})

    } catch (error) {
        console.error("Error Fetching User", error)
        return NextResponse.json({error: "Failed To Fetch User"}, {status: 500})
    }
}