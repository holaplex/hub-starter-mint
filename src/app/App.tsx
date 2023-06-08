'use client';

import { ApolloProvider } from '@apollo/client';
import api from '@/modules/api';
import MeProvider from '@/providers/MeProvider';
import { User } from '@/graphql.types';
import { ToastContainer } from 'react-toastify';

export default function App({
  children,
  me
}: {
  children: React.ReactNode;
  me: User | undefined;
}) {
  return (
    <ApolloProvider client={api}>
      <MeProvider me={me}>
        {children}
        <ToastContainer theme='dark' position='bottom-right' />
      </MeProvider>
    </ApolloProvider>
  );
}
