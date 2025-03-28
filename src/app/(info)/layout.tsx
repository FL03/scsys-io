/*
  Appellation: layout <(info)>
  Contrib: @FL03
*/
'use client';
// imports
import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function Layout({ children }: Readonly<React.PropsWithChildren>) {
  const { alias } = useParams<{ alias: string }>();
  const router = useRouter();

  if (alias === 'undefined') {
    router.replace('/auth/login');
  }
  return <>{children}</>;
}
Layout.displayName = 'InfoLayout';