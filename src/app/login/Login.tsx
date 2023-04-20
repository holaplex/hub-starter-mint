"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full gap-4">
      <Link href="/" className="fixed top-8 right-8">
        <XMarkIcon
          className="w-14 h-14 cursor-pointe hover:opacity-80"
        />
      </Link>
      <h1 className="text-2xl bold mb-8">Sign in to create your free wallet</h1>
      <button
        className="rounded-lg px-20 py-3 bg-cta text-black hover:opacity-80 transition"
        onClick={() => signIn("google")}
      >
        Continue with Google
      </button>
    </div>
  );
}
