"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import TrashCan from "@/assets/trashcan";

interface RemoveBtnProps {
  id: string;
}

export default function RemoveBtn({ id }: RemoveBtnProps) {
  const router = useRouter();
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      try {
        const res = await axios.delete(`/api/collections/?id=${id}`);
        if (res.status === 200) {
          router.refresh();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <button onClick={removeTopic} >
      <TrashCan className="w-5 h-5"/>
    </button>
  );
}