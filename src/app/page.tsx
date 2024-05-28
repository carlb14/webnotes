import LoginUI from "@/components/login";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
export default async function App() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/home');
  }
  return (
    <LoginUI />
  );
}