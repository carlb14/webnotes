import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null;


                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (!passwordsMatch) {
                        return null;
                    }
                    return user;
                } catch (error) {
                    console.log("Error", error)
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.next_secret!,
    pages: {
        signIn: "/",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };