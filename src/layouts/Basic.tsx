"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { Wallet } from "@prisma/client";
import { shorten } from "@/modules/wallet";
import useMe from "@/hooks/useMe";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function Basic({
  children,
  session,
  wallet,
}: {
  children: React.ReactNode;
  session: Session | null;
  wallet: Wallet | null;
}) {
  const me = useMe();
  const pathname = usePathname();
  return (
    <>
      {children}
      <footer className="w-full max-w-md py-4 px-6 rounded-lg mb-6 mt-8 justify-self-end bg-white bg-opacity-10 flex flex-col gap-2 items-start">
        {session ? (
          <div className="flex flex-row gap-2 items-center">
            <img
              className="w-14 h-14 rounded-full"
              src={session?.user?.image as string}
            />
            <div className="flex flex-col gap-1">
              {me?.wallet ? (
                <>
                  <span className="text-xs text-gray-300">
                    Wallet connected
                  </span>
                  <span>{shorten(me?.wallet?.address as string)}</span>
                </>
              ) : (
                <>
                  <div className="h-4 w-24 rounded-md bg-gray-800 animate-pulse" />
                  <div className="h-6 w-16 rounded-md bg-gray-800 animate-pulse" />
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-row justify-between items-center w-full">
            <span className="text-xs text-gray-300">
              Sign up to generate your wallet
            </span>
            <Link
              href={`/login?return_to=${pathname}`}
              className="rounded-full px-6 py-3 bg-yellow-300 hover:bg-opacity-80 transition text-black"
            >
              Sign up
            </Link>
          </div>
        )}
      </footer>
      <div className="flex flex-row gap-4 justify-between items-center mb-4">
        <Image
          src="/img/holaplex-logo.png"
          alt="holaplex logo"
          width={69}
          height={6}
        />
        <PlusIcon className="w-3" color="#BDBDBD" />
        <Image
          src="/img/eluvio-logo.png"
          alt="eluvio logo"
          width={54}
          height={24}
        />
        <PlusIcon className="w-3" color="#BDBDBD" />
        <Image
          src="/img/solana-logo.png"
          alt="eluvio log"
          width={68}
          height={10}
        />
      </div>
    </>
  );
}
