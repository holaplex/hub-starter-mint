'use client';

import { Session } from 'next-auth';
import Image from 'next/image';
import { Wallet } from '../graphql.types';
import { usePathname, useSelectedLayoutSegments } from 'next/navigation';
import Link from 'next/link';
import useMe from '../hooks/useMe';

export default function Header({
  children,
  session,
  wallet
}: {
  children: React.ReactNode;
  session: Session | null;
  wallet: Wallet | null;
}) {
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();
  const me = useMe();

  if (['login'].includes(segments[0])) return <>{children}</>;

  return (
    <div className='flex flex-col'>
      <div className='flex justify-between items-center py-4 px-8 md:px-0'>
        <div className='relative w-[103px] md:w-[199px] h-[9px] md:h-[18px]'>
          <Image src='/img/holaplex-logo.png' alt='holaplex logo' fill />
        </div>
        {!session ? (
          <>
            <div className='flex gap-1 items-center md:hidden'>
              <Link
                href={`/login?return_to=${pathname}`}
                className='text-yellow-300 font-medium'
              >
                Log in
              </Link>
              <span className='text-gray-300 font-medium'>or</span>
              <Link
                href={`/login?return_to=${pathname}`}
                className='text-yellow-300 font-medium'
              >
                Sign up
              </Link>
            </div>
            <div className='hidden md:flex gap-6 items-center '>
              <Link
                href={`/login?return_to=${pathname}`}
                className='text-yellow-300 font-bold border-2 rounded-full border-yellow-300 py-3 px-6'
              >
                Log in
              </Link>
              <Link
                href={`/login?return_to=${pathname}`}
                className='text-gray-900 bg-yellow-300 rounded-full font-bold py-3 px-6'
              >
                Sign up
              </Link>
            </div>
          </>
        ) : (
          <button className='text-yellow-300 font-bold border-2 rounded-full border-yellow-300 py-3 px-6 flex gap-2'>
            <img
              className='w-6 h-6 rounded-full'
              src={session?.user?.image as string}
            />
            <span>{session.user?.name}</span>
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
