import connect from "@/lib/db";
import User from "@/model/user";
import { NextResponse } from "next/server";


export async function POST(req : Request){
    await connect();
    const {email , password}: Partial<User> = await req.json();
    try {
        const newUser = new User({
            email,
            password
        })
        await newUser.save();
        return  NextResponse.json(newUser, {status: 200})
    } catch (error) {
        return NextResponse.json({error}, {status:500})
    }
}
export async function GET(){
    await connect();
    try {
        
        const users = await User.find()
        return  NextResponse.json(users, {status: 200})
    } catch (error) {
        return NextResponse.json({error}, {status:500})
    }
}