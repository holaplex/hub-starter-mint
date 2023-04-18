'use client';

import { Session } from 'next-auth';
import Image from 'next/image';
import { Wallet } from '../graphql.types';

export default function Header({
  children,
  session,
  wallet
}: {
  children: React.ReactNode;
  session: Session | null;
  wallet: Wallet | null;
}) {
  const login = () => {};

  const signup = () => {};
  return (
    <div className='flex flex-col'>
      <div className='flex justify-between items-center py-4 px-8 md:px-0'>
        <div className='relative w-[103px] md:w-[199px] h-[9px] md:h-[18px]'>
          <Image src='/img/holaplex-logo.png' alt='holaplex logo' fill />
        </div>
        <div className='flex gap-1 items-center md:hidden'>
          <button className='text-yellow-300 font-medium'>Log in</button>
          <span className='text-gray-300 font-medium'>or</span>
          <button className='text-yellow-300 font-medium'>Sign up</button>
        </div>
        <div className='hidden md:flex gap-6 items-center '>
          <button
            className='text-yellow-300 font-bold border-2 rounded-full border-yellow-300 py-3 px-6'
            onClick={login}
          >
            Log in
          </button>
          <button
            className='text-gray-900 bg-yellow-300 rounded-full font-bold py-3 px-6'
            onClick={signup}
          >
            Sign up
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
