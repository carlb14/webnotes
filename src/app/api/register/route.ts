"use server"

import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import User from "../../../models/user";
import bcrypt from 'bcryptjs'
export async function POST(req: { json: () => PromiseLike<{ username: any; email: any; password: any; }> | { username: any; email: any; password: any; }; }) {
    const res = NextResponse;
    try {


        const { username, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongoDB();
        await User.create({ username, email, password: hashedPassword });

        return res.json({ message: 'User registered' }, { status: 201 });

    }
    catch (error) {
        return res.json(
            { message: 'An error occured while registering the user.' },
            { status: 500 }
        );
    }
}