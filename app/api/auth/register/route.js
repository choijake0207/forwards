import { NextResponse } from "next/server";
import {User} from "../../../../models"
import bcrypt from "bcrypt"

// register request

export async function POST(request) {

    console.log("UserModeL:", User)
    try {
        const {firstName, lastName, username, password} = await request.json()
        const first = firstName.toLowerCase()
        const last = lastName.toLowerCase()
        const handle = username.toLowerCase()
        // check for existing
        const exists = await User.findOne({where: {username: username}})
        if (exists) {
            return NextResponse.json({error: "Username Already Exists"}, {status: 400})
        }
        const hash  = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            firstName: first,
            lastName: last,
            username: handle,
            password: hash
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