import RegisterUi from "@/components/register";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
export default async function Register() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect('/home');
    }
    return (
        <RegisterUi />
    );
}