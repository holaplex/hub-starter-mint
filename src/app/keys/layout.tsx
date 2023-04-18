import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Wallet } from "@prisma/client";
import db from "@/modules/db";
import Basic from "@/layouts/Basic";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  let wallet: Wallet | null = null;

  if (session) {
    wallet = await db.wallet.findFirst({
      where: {
        user: {
          email: session.user?.email,
        },
      },
    });
  }

  return (
    <Basic wallet={wallet} session={session}>
      {children}
    </Basic>
  );
}
