"use client"
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function LoginUI() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const LoginHandle = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await signIn("credentials", {
                email, password, redirect: false,
            });

            if (res?.ok) {
                router.push('/home');
            } else {




                setLoading(false);
                setResult('Invalid Credentials')
                return;
            }

        } catch (error) {

        }
    }
    return (
        <main className="grid place-items-center p-3 h-screen">
            <div className="md:w-1/4 w-full flex flex-col justify-center items-center ">
                <form onSubmit={LoginHandle} className="w-full">

                    <section className="flex flex-col">
                        <label className="text-xs font-medium tracking-wide m-1">Email</label>
                        <input type="email" className="p-3 bg-gray-200 rounded-md w-full outline-none text-xs " placeholder="Your email" onChange={(e) => setEmail(e.target.value)} />
                    </section>
                    <section className="flex flex-col">
                        <label className="text-xs font-medium tracking-wide m-1">Password</label>
                        <input type="password" className="p-3 bg-gray-200 rounded-md w-full outline-none text-xs " placeholder="Your eassword" onChange={(e) => setPassword(e.target.value)} />
                    </section>
                    <section className="my-2 gap-3">
                        <button className=" w-full md:w-3/6 p-2 rounded-md bg-neutral-900 text-white text-xs" type="submit">
                            Login
                        </button>

                        <Link href={'/register'} className="text-xs text-neutral-800 md:mx-2 mx-1 ">Register?</Link>

                    </section>

                </form>
                <section className="my-1">
                    <p className="text-xs">{result}</p>
                </section>
            </div>

        </main>
    );
}