'use client';
import { redirect } from 'next/navigation';
import Collectibles from './Collectibles';
import useMe from '../../hooks/useMe';

export default function CollectiblesPage() {
  const me = useMe();
  if (!me) {
    redirect('/');
  }

  return <Collectibles />;
}
