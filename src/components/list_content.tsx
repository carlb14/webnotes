"use client";
import { useState, useEffect, Key } from "react";
import Link from "next/link";
import RemoveBtn from "./removeBtn";
import Pencil from "@/assets/pencil"; // Ensure this path is correct

import axios from "axios";
import LoadingScreen from "./loadingscreen";

interface Topic {
    _id: string;
    title: string;
    description: string;
}

const getTopics = async (): Promise<{ topics: Topic[] }> => {
    try {
        const res = await axios.get('/api/collections', {
            headers: {
                'Cache-Control': 'no-store'
            }
        });

        if (res.status !== 200) {
            throw new Error("Failed to fetch topics");
        }

        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default function TopicsList() {
    const [loading, setLoading] = useState(true);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [error, setError] = useState<string | null>(null);



    useEffect(() => {

        const fetchTopics = async () => {
            try {
                const data = await getTopics();
                setTopics(data.topics);
                setLoading(false); // Set loading to false after topics are fetched
            } catch (error) {
                setError("Error retrieving collection");
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchTopics();

        const intervalId = setInterval(fetchTopics, 10000);

        return () => clearInterval(intervalId);
    }, []);



    if (loading) {
        return <LoadingScreen />

    }

    return (
        <main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-1 p-1 ">
            {topics.map((t) => (
                <div
                    key={t._id}
                    className="flex flex-col p-2 m-1   border rounded-md border-neutral-300 h-fit"
                >
                    <section className="my-1 mx-2">
                        <h2 className="text-title font-medium text-neutral-800 ">
                           {t.title}
                        </h2>
                    </section>
                    <section className="mx-2">
                        <p className="text-neutral-700 text-sm">
                           
                            {t.description}
                        </p>
                    </section>
                    <div className="flex gap-2 my-2 mx-2 items-center justify-end">

                        <Link href={`/editTopic/${t._id}`}>
                            <Pencil className=" w-5 h-5 " />
                        </Link>
                        <RemoveBtn id={t._id} />
                    </div>
                </div>
            ))}
        </main>
    );

}
