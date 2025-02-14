import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export async function PUT (request) {
    try {
        const authHeader = request.headers.get("Authorization")
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("Missing or Invalid Token")
            return NextResponse.json({error: "Missing or Invalid Token"})
        }
        const token = authHeader.split(" ")[1]
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        const extractedId = verified.id


        const {oldPassword, newPassword} = await request.json()

        const prisma = new PrismaClient()

        const target = await prisma.user.findFirst({
            where: {
                id: extractedId
            }
        })

        const match = await bcrypt.compare(oldPassword, target.password)
        if (!match) {
            return NextResponse.json({error: "Incorrect Old Password"}, {status: 401})
        }
        const newHashed = await bcrypt.hash(newPassword, 10)

        await prisma.user.update({
            where: {id: target.id},
            data: {password: newHashed}
        })

        return NextResponse.json({message: "Password Succesfully Changed"})

    } catch (error) {
        console.error("Error Changing Password", error)
        return NextResponse.json({error: "Failed To Change Password"}, {status: 500})
    }

}