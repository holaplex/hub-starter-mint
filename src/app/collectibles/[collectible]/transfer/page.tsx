import Transfer from './Transfer';

interface TransferPageProps {
  params: { collectible: string };
}

export default function TransferPage({
  params: { collectible }
}: TransferPageProps): React.ReactNode {
  return (
    <div className='h-screen flex items-center justify-center'>
      <Transfer collectible={collectible} />
    </div>
  );
}
