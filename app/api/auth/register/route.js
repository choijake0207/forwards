import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client";

// register request

export async function POST(request) {


    try { 
        const {firstName, lastName, username, password} = await request.json()
        const first = firstName.toLowerCase()
        const last = lastName.toLowerCase()
        const handle = username.toLowerCase()
        // check for existing
        const prisma = new PrismaClient()
        const exists = await prisma.user.findUnique({where: {username: handle}})
        console.log("exists",exists)
        if (exists) {
            return NextResponse.json({error: "Username Already Exists"}, {status: 400})
        }
        const hash  = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data:
            {
            firstName: first,
            lastName: last,
            username: handle,
            password: hash
            }
        })
        return NextResponse.json({
            message: "Succesfully Created Account",
            newUser
        }, {status: 201})

    } catch (error) {
        console.error("Failed To Create Account", error)
        return NextResponse.json({error: "Failed To Create Account. Try Again Later"}, {status: 500})
    }
}