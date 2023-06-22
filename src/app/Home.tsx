'use client';
import Image from 'next/image';
import { useMemo } from 'react';
import { CollectionMint, Holder } from '@/graphql.types';
import { shorten } from '../modules/wallet';
import { MintDrop } from '@/mutations/mint.graphql';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { GetDrop } from '@/queries/drop.graphql';
import Link from 'next/link';
import { isNil, not, pipe } from 'ramda';
import useMe from '@/hooks/useMe';
import { Session } from 'next-auth';
import { toast } from 'react-toastify';
import { PopoverBox } from '../components/Popover';
import { Icon } from '../components/Icon';
import { signOut } from 'next-auth/react';
import Copy from '../components/Copy';

interface MintData {
  mint: CollectionMint;
}

interface HomeProps {
  session?: Session | null;
}

export default function Home({ session }: HomeProps) {
  const me = useMe();
  const dropQuery = useQuery(GetDrop);
  const collection = dropQuery.data?.drop.collection;
  const metadataJson = collection?.metadataJson;
  const holder = useMemo(() => {
    return collection?.holders?.find(
      (holder: Holder) => holder.address === me?.wallet?.address
    );
  }, [collection?.holders, me?.wallet]);
  const owns = pipe(isNil, not)(holder);
  const [mint, { loading }] = useMutation<MintData>(MintDrop, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetDrop
      }
    ]
  });

  const onMint = () => {
    mint({
      onCompleted: (data: MintData) => {
        toast.success('Mint successful');
      },
      onError: (error: ApolloError) => {
        toast.error(
          'Unable to mint. Please try again or reach out to support.'
        );
      }
    });
  };

  return (
    <>
      <header className='flex w-full justify-between items-center py-4'>
        <Image src='/img/logo.png' alt='site logo' width={199} height={18} />
        {!me ? (
          <>
            <div className='flex gap-1 md:gap-4 items-center'>
              <Link
                href='/login'
                className='text-cta font-medium md:font-bold md:border-2 md:rounded-full md:border-cta md:py-3 md:px-6'
              >
                Log in
              </Link>
              <span className='text-gray-300 font-medium md:hidden'>or</span>
              <Link
                href='/login'
                className='text-cta font-medium md:text-backdrop md:bg-cta md:rounded-full md:font-bold md:py-3 md:px-6'
              >
                Sign up
              </Link>
            </div>
          </>
        ) : (
          <PopoverBox
            triggerButton={
              <button className='text-cta font-bold border-2 rounded-full border-cta py-3 px-6 flex gap-2 items-center'>
                <img
                  className='w-6 h-6 rounded-full'
                  src={me?.image as string}
                />
                <span>{me?.name}</span>
                <Icon.ChevronDown className='stroke-cta' />
              </button>
            }
          >
            <div className='rounded-lg bg-contrast p-6 flex flex-col items-center mt-4'>
              <span className='text-xs text-gray-300'>
                Solana wallet address
              </span>
              <div className='flex gap-2 mt-1'>
                <span className='text-xs'>
                  {shorten(me.wallet?.address as string)}
                </span>
                <Copy copyString={me.wallet?.address as string} />
              </div>
              <button
                onClick={() => signOut()}
                className='text-cta font-medium md:font-bold md:border-2 md:rounded-full md:border-cta md:py-3 md:px-6 mt-10'
              >
                Log out
              </button>
            </div>
          </PopoverBox>
        )}
      </header>
      <main className='w-full grid grid-cols-12 md:gap-20 mt-6 md:mt-10 lg:mt-16'>
        {/* Name & description on small screens */}
        <div className='flex flex-col md:hidden items-center col-span-12 mb-6'>
          {dropQuery.loading ? (
            <>
              <div className='rounded-full bg-contrast w-60 h-6 animate-pulse' />
              <div className='flex flex-col gap-2 w-full mt-6 md:mt-3'>
                <div className='rounded-full bg-contrast w-full h-4 animate-pulse' />
                <div className='rounded-full bg-contrast w-full h-4 animate-pulse' />
              </div>
            </>
          ) : (
            <>
              <span className='text-2xl font-extrabold'>
                {metadataJson?.name}
              </span>
              <span className='text-base font-medium text-gray-300 text-center mt-6'>
                {metadataJson?.description}
              </span>
            </>
          )}
        </div>
        <div className='col-span-12 md:col-span-6'>
          {dropQuery.loading ? (
            <div className='w-full aspect-square rounded-lg bg-contrast animate-pulse' />
          ) : (
            <img
              src={metadataJson?.image as string}
              alt={metadataJson?.name as string}
              className='w-full object-cover aspect-square rounded-lg'
            />
          )}
        </div>
        <div className='col-span-12 md:col-span-6 self-center'>
          {/* Name & description on md and above */}
          <div className='hidden md:flex md:flex-col items-center md:items-start md:justify-center '>
            {dropQuery.loading ? (
              <>
                <div className='rounded-full bg-contrast w-60 h-6 animate-pulse' />
                <div className='flex flex-col gap-2 w-full mt-6 md:mt-3'>
                  <div className='rounded-full bg-contrast w-full h-4 animate-pulse' />
                  <div className='rounded-full bg-contrast w-full h-4 animate-pulse' />
                  <div className='rounded-full bg-contrast w-28 h-4 animate-pulse' />
                </div>
              </>
            ) : (
              <>
                <span className='text-2xl font-extrabold md:text-xl lg:text-3xl md:font-semibold'>
                  {metadataJson?.name}
                </span>
                <span className='text-base font-medium text-gray-300 mt-6 md:mt-3 text-center md:text-left'>
                  {metadataJson?.description}
                </span>
              </>
            )}
          </div>
          <div className='bg-contrast rounded-lg p-6 flex justify-between mt-8 items-center mb-6'>
            {dropQuery.loading ? (
              <>
                <div className='flex flex-row gap-2 items-center'>
                  <div className='bg-backdrop w-14 aspect-square rounded-full animate-pulse' />
                  <div className='flex flex-col gap-1 justify-between'>
                    <div className='h-4 w-24 rounded-full bg-backdrop animate-pulse' />
                    <div className='h-6 w-16 rounded-full bg-backdrop animate-pulse' />
                  </div>
                </div>
                <div className='font-bold rounded-full bg-backdrop w-32 h-12 transition animate-pulse' />
              </>
            ) : session ? (
              owns ? (
                <div className='flex flex-row w-full items-center gap-2 justify-between'>
                  <div className='flex flex-col gap-2'>
                    <span className='text-subtletext font-semibold'>
                      NFT claimed!
                    </span>
                    <Link
                      href='/collectibles'
                      className='font-semibold text-white underline cursor-pointer'
                    >
                      View in your wallet
                    </Link>
                  </div>
                  <Icon.Success />
                </div>
              ) : (
                <>
                  <div className='flex flex-row items-center gap-2'>
                    <img
                      className='w-14 h-14 rounded-full'
                      src={session?.user?.image as string}
                    />

                    <div className='flex flex-col gap-1 justify-between'>
                      <span className='text-gray-300 text-xs'>
                        Wallet connected
                      </span>
                      <span>{shorten(me?.wallet?.address as string)}</span>
                    </div>
                  </div>

                  <button
                    className='font-bold rounded-full bg-cta text-contrast py-3 px-6 transition hover:opacity-80'
                    onClick={onMint}
                    disabled={loading}
                  >
                    Claim now
                  </button>
                </>
              )
            ) : (
              <>
                <span className='text-xs md:text-base text-gray-300'>
                  Sign up to claim your NFT
                </span>
                <Link
                  href='/login'
                  className='font-bold rounded-full bg-cta text-contrast py-3 px-6 transition hover:opacity-80'
                >
                  Claim now
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
