'use client';
import { ApolloError, useMutation } from '@apollo/client';
import { TransferAssetPayload } from '../../../../graphql.types';
import { TransferMint } from '../../../../mutations/mint.graphql';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Icon } from '../../../../components/Icon';

interface TransferMintData {
  transferAsset: TransferAssetPayload;
}

interface TransferMintVars {
  id: String;
  wallet: String;
}

interface TransferForm {
  wallet: string;
}

export default function Transfer({ collectible }: { collectible: string }) {
  const router = useRouter();
  const [nftSent, setNftSent] = useState<boolean>(false);
  
  const chainName = (process.env.NEXT_PUBLIC_CHAIN_NAME === undefined) ? "Solana": process.env.NEXT_PUBLIC_CHAIN_NAME;

  const { register, handleSubmit, formState, setError } =
    useForm<TransferForm>();

  const [transferMint, transferMintResult] = useMutation<
    TransferMintData,
    TransferMintVars
  >(TransferMint);

  const submit = async ({ wallet }: TransferForm) => {
    if (!wallet) return;
    transferMint({
      variables: {
        id: collectible,
        wallet: wallet
      },
      onError: (error: ApolloError) => {
        console.log('Error', error);
        setError('root', { message: error.message });
      },
      onCompleted: () => {
        setNftSent(true);
      }
    });
  };

  const close = () => {
    router.push('/collectibles');
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen w-[366px]'>
      <h1 className='text-3xl font-bold text-center'>
        Send this NFT to a {chainName} wallet
      </h1>
      {!nftSent ? (
        <form
          className='flex flex-col mt-14 w-full'
          onSubmit={handleSubmit(submit)}
        >
          <label className='text-sm text-subtletext' htmlFor='wallet'>
          {chainName} wallet address
          </label>
          <input
            id='wallet'
            type='text'
            className='w-full rounded-lg bg-cellsubtle border border-cellsubtle text-white focus:outline-none py-2 px-3 mt-1'
            {...register('wallet', {
              required: 'Please provide a wallet address.'
            })}
          />
          {formState.errors.wallet?.message && (
            <span className='w-full p-4 text-sm font-medium text-failure bg-failure bg-opacity-25 rounded-lg mt-4'>
              {formState.errors.wallet?.message}
            </span>
          )}
          {formState.errors.root?.message && (
            <span className='w-full p-4 text-sm font-medium text-failure bg-failure bg-opacity-25 rounded-lg mt-4'>
              {formState.errors.root?.message}
            </span>
          )}
          <div className='flex gap-4 items-center justify-center mt-14'>
            <button
              className='w-full font-medium border-2 rounded-full border-cta text-cta py-3 px-6'
              onClick={close}
              disabled={formState.isLoading}
            >
              Cancel
            </button>
            <button
              className='w-full font-medium text-backdrop bg-cta rounded-full py-3 px-6'
              type='submit'
              disabled={formState.isLoading}
            >
              {formState.isLoading ? <Icon.Loading /> : <>Next</>}
            </button>
          </div>
        </form>
      ) : (
        <>
          <span className='w-full p-4 text-sm font-medium text-success bg-success bg-opacity-25 rounded-lg mt-14'>
            NFT sent! It should be available in the destination wallet in just a
            few moments.
          </span>
          <button
            className='w-full font-medium text-backdrop bg-cta rounded-full py-3 px-6 mt-14'
            onClick={close}
          >
            Close
          </button>
        </>
      )}
    </div>
  );
}
