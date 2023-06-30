'use client';
import {
  TransferAssetInput,
  TransferAssetPayload
} from '../../../../graphql.types';
import { TransferAsset } from '../../../../mutations/transfer.graphql';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Icon } from '../../../../components/Icon';
import holaplex from '../../../../modules/holaplex';

interface TransferAssetData {
  transferAsset: TransferAssetPayload;
}

interface TransferAssetVars {
  input: TransferAssetInput;
}

interface TransferForm {
  wallet: string;
}

export default function Transfer({ collectible }: { collectible: string }) {
  const router = useRouter();
  const [nftSent, setNftSent] = useState<boolean>(false);

  const { register, handleSubmit, formState, setError } =
    useForm<TransferForm>();

  const submit = async ({ wallet }: TransferForm) => {
    if (!wallet) return;

    const { data, errors } = await holaplex.mutate<
      TransferAssetData,
      TransferAssetVars
    >({
      mutation: TransferAsset,
      variables: {
        input: {
          id: collectible,
          recipient: wallet
        }
      }
    });

    if (!errors) {
      setNftSent(true);
    } else {
      setError('root', { message: errors[0].message });
    }
  };

  const close = () => {
    router.push('/collectibles');
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen w-[366px]'>
      <h1 className='text-3xl font-bold text-center'>
        Send this NFT to a Solana wallet
      </h1>
      {!nftSent ? (
        <form
          className='flex flex-col mt-14 w-full'
          onSubmit={handleSubmit(submit)}
        >
          <label className='text-sm text-subtletext' htmlFor='wallet'>
            Solana wallet address
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
