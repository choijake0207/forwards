import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client";

export async function POST (request) {
    try {
        const {username, password} = await request.json()
        const handle = username.toLowerCase()
        const prisma = new PrismaClient()
        // check for account existence
        const exists = await prisma.user.findUnique({where: {username: handle}})
        if (!exists) {
            return NextResponse.json({error: "Username Does Not Exist"}, {status: 404})
        }
        // check password
        const match = await bcrypt.compare(password, exists.password)
        if (!match) {
            return NextResponse.json({error: "Incorrect Password"}, {status: 401})
        }
        return NextResponse.json({
            message: "Logged In",
        }, {status: 201})


    } catch (error) {
        console.error("Failed To Login:", error)
        return NextResponse.json({error: "Failed To Login"}, {status: 500})
    }
}