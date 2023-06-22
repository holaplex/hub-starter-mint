'use client';

import { ApolloError, useMutation } from '@apollo/client';
import {
  TransferAssetInput,
  TransferAssetPayload
} from '../../../../graphql.types';
import { TransferAsset } from '../../../../mutations/transfer.graphql';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface TransferAssetData {
  transferAsset: TransferAssetPayload;
}

interface TransferAssetVars {
  input: TransferAssetInput;
}

export default function Transfer({ collectible }: { collectible: string }) {
  const router = useRouter();
  const [wallet, setWallet] = useState<string>();

  const [transferAsset, transferAssetResult] = useMutation<
    TransferAssetData,
    TransferAssetVars
  >(TransferAsset);

  const submit = async () => {
    if (!wallet) return;
    transferAsset({
      variables: {
        input: {
          id: collectible,
          recipient: wallet
        }
      },
      onError: (error: ApolloError) => {
        console.log('Error', error);
      },
      onCompleted: () => {
        console.log('Completed');
      }
    });
  };

  const cancel = () => {
    router.push('/collectibles');
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen w-[300px}'>
      <h1 className='text-2xl bold mb-8'>Send this NFT to a Solana wallet</h1>
      <form className='flex flex-col mt-2 w-full' onSubmit={submit}>
        <label>Solana wallet address</label>
        <input
          id='wallet'
          type='text'
          onChange={(e) => setWallet(e.target.value)}
        />
        <div className='flex gap-4 items-center justify-center mt-14'>
          <button
            className='font-medium border-2 rounded-full border-cta text-cta py-3 px-6'
            onClick={cancel}
          >
            Cancel
          </button>
          <button
            className='font-medium text-backdrop bg-cta rounded-full py-3 px-6'
            type='submit'
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
