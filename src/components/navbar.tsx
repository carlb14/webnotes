"use client"
import SignOutIcon from "@/assets/signOutIcon";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Navbar() {
    const router = useRouter();
    const handleSignOut = async () => {

        await signOut({ redirect: false });
        router.push('/');
    };
    return (
        <header className="p-1">
            <nav className="p-3 md:flex justify-between items-center  ">
                <section>

                    <label className="text-sm font-regular text-neutral-700">Your Collections</label>
                </section>
                <section className="flex items-center mx-2">
                    <a className="flex items-center h-6 cursor-pointer text-xs" onClick={handleSignOut}>
                        <SignOutIcon className="w-6 h-6 mr-2" />
                        Sign Out
                    </a>
                </section>
            </nav>
        </header>
    );
}