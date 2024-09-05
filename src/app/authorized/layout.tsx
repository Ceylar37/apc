'use client';

import { useMe } from '@/entities/user';
import { useRouter } from 'next/navigation';

export default function AuthorizedLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { error } = useMe();
  const router = useRouter();

  if (error) {
    router.push('/login');
  }

  return <main className='p-3 space-y-3'>{children}</main>;
}
