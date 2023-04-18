'use client';
import Image from 'next/image';
import useMe from '../hooks/useMe';
import { shorten } from '../modules/wallet';

export default function Home() {
  const me = useMe();

  return (
    <div className='flex flex-col px-6 mt-14 md:mt-24'>
      <div className='flex flex-col-reverse md:flex-row gap-6 md:gap-20'>
        <div className='w-[466px] aspect-square bg-yellow-300 rounded-lg place-self-center md:place-self-start flex items-center justify-center p-24 md:p-28'>
          <div className='relative w-full h-full md:w-[222px] md:h-[175px]'>
            <Image src='/img/holaplex-nft.svg' alt='holaplex nft' fill />
          </div>
        </div>
        <div className='flex flex-col items-center md:items-start md:justify-center'>
          <span className='text-2xl font-extrabold md:text-3xl lg:text-5xl md:font-semibold'>
            Holaplex Hub NFT
          </span>
          <span className='text-base font-medium text-gray-300 mt-6 md:mt-3 text-center md:text-left'>
            See just how easy it can be to create, manage and analyze NFTs with
            zero web3 experience.
          </span>
          <div className='bg-gray-800 rounded-lg p-6 hidden md:visible md:flex justify-between mt-10 w-full items-center'>
            <div className='flex flex-col'>
              <span className='text-gray-300 font-semibold'>Price</span>
              <span className='font-semibold'>FREE</span>
            </div>
            <button className='rounded-full bg-yellow-300 py-3 px-8 text-gray-900'>
              Claim now
            </button>
          </div>
        </div>
      </div>
      <div className='bg-gray-800 rounded-lg p-6 flex md:hidden justify-between mt-8 w-full items-center mb-6'>
        {me?.wallet ? (
          <div className='flex gap-2 items-center'>
            <img className='w-10 h-10 rounded-full' src={me.image as string} />
            <div className='flex flex-col gap-1'>
              <span className='text-gray-300 text-xs'>Wallet connected</span>
              <span>{shorten(me?.wallet?.address as string)}</span>
            </div>
          </div>
        ) : (
          <span className='text-gray-300'>Sign up to clain free NFT</span>
        )}
        <button className='rounded-full bg-yellow-300 py-3 px-8 text-gray-900'>
          Claim NFT
        </button>
      </div>
    </div>
  );
}
