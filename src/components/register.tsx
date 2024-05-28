"use client"
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function RegisterUi() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');

    const Registerhandle = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        setLoading(true);
        if (!username || !email || !password) {

            setLoading(false); // Reset loading state
            setResult('Fill all the blanks.')
            return;
        }

        if (cpassword !== password) {
            setResult('Password and Confirm Password must be matched.')
            //setLoading(false); // Reset loading state

            return;
        }

        try {
            const resUserExists = await axios.post('/api/userExist', {
                email,
            });

            const user = resUserExists.data.user;

            if (user) {

                // setLoading(false); // Reset loading state
                setResult('User already exists')
                return;
            }

            const res = await axios.post('/api/register', {
                username,
                email,
                password
            });

            if (res.status >= 200) {
                console.log('User Successfully registered');
                router.push('/');
            } else {
                setResult('Registeration failed. Please try to check you internet connection.')
            }
        } catch (error) {
            console.log('An error occurred during registration:', error);
        } finally {
            setLoading(false); // Reset loading state regardless of success or failure
        }
    };
    return (
        <main className="grid place-items-center p-2 h-screen">
            <div className="md:w-1/4 w-full flex flex-col justify-center items-center ">
                <form onSubmit={Registerhandle} className="w-full">
                    <section className="flex flex-col">
                        <label className="text-xs font-medium tracking-wide m-1">Username</label>
                        <input type="name" className="p-3 bg-gray-200 rounded-md w-full outline-none text-xs " placeholder="Your username" onChange={(e) => setUsername(e.target.value)} />
                    </section>
                    <section className="flex flex-col">
                        <label className="text-xs font-medium tracking-wide m-1">Email</label>
                        <input type="email" className="p-3 bg-gray-200 rounded-md w-full outline-none text-xs " placeholder="Your email" onChange={(e) => setEmail(e.target.value)} />
                    </section>
                    <section className="flex flex-col">
                        <label className="text-xs font-medium tracking-wide m-1">Password</label>
                        <input type="password" className="p-3 bg-gray-200 rounded-md w-full outline-none text-xs " placeholder="Your password" onChange={(e) => setPassword(e.target.value)} />
                    </section>
                    <section className="flex flex-col">
                        <label className="text-xs font-medium tracking-wide m-1">Confirm Password</label>
                        <input type="password" className="p-3 bg-gray-200 rounded-md w-full outline-none text-xs " placeholder="Retype your password" onChange={(e) => setCPassword(e.target.value)} />
                    </section>
                    <section className="my-2 gap-3">
                        <button className=" w-full md:w-3/6 p-2 rounded-md bg-neutral-900 text-white text-xs" type="submit">
                            Register
                        </button>

                        <Link href={'/'} className="text-xs  text-neutral-800 md:mx-2 mx-1 ">Login?</Link>

                    </section>

                </form>
                <section className="my-1">
                    <p className="text-xs">{result}</p>
                </section>
            </div>
        </main>
    );
}