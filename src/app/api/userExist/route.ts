"use server"
import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";

export async function POST(req: { json: () => PromiseLike<{ email: any; }> }) {
    try {
        await connectMongoDB();
        const { email } = await req.json();
        const user = await User.findOne({ email }).select('_id');
        
        
        // Send response indicating whether user exists
        return NextResponse.json({ user: !!user }); // Send true if user exists, false if not
    } catch (error) {
        console.log(error);
        return NextResponse.error(error); // Send error response if any error occurs
    }
}