import './globals.css';
import { Inter } from '@next/font/google';
import clsx from 'clsx';
import App from './App';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import UserSource from '@/modules/user';
import holaplex from '@/modules/holaplex';

import db from '@/modules/db';
import Image from 'next/image';
import Header from '../layouts/Header';
import { Wallet } from '../graphql.types';

const inter = Inter({ subsets: ['latin'] });

const userSource = new UserSource(holaplex, db);

export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  const me = await userSource.get(session?.user?.email);

  let wallet: Wallet | null = null;

  if (session) {
    wallet = await db.wallet.findFirst({
      where: {
        user: {
          email: session.user?.email
        }
      }
    });
  }

  return (
    <html lang='en'>
      <head />
      <body
        className={clsx(
          inter.className,
          'bg-black text-white container m-auto flex flex-col flex-grow min-h-screen max-w-5xl items-center px-4 lg:px-0'
        )}
      >
        <App me={me}>
          <Header session={session} wallet={wallet}>
            {children}
          </Header>
        </App>
      </body>
    </html>
  );
}
