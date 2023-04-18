import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import Login from './Login';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/keys");
  }

  return (
    <Login />
  );
}
