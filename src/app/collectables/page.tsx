import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import Collectables from './Collectables';

export default async function CollectablesPage() {
  //const session = await getServerSession(authOptions);

  // if (session) {
  //   redirect('/');
  // }

  return <Collectables />;
}
