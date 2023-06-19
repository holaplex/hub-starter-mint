'use client';
import { redirect } from 'next/navigation';
import Collectables from './Collectables';
import useMe from '../../hooks/useMe';

export default async function CollectablesPage() {
  const me = useMe();
  if (!me) {
    redirect('/');
  }

  return <Collectables />;
}
