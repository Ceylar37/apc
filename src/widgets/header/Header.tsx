'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useMe } from '@/entities/user';
import { ThemeToggle } from '@/features/theme';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const AUTHORIZED_ROUTES = [
  {
    path: '',
    title: 'Main'
  },
  {
    path: '/history',
    title: 'History'
  }
];

export const Header = () => {
  const { data: me, isLoading } = useMe();
  const pathname = usePathname();

  return (
    <header className='w-full flex justify-between items-center p-5 border-b'>
      <div className='flex items-center gap-3'>
        <h1 className='h-max text-3xl'>APC</h1>
        {me &&
          AUTHORIZED_ROUTES.filter(({ path }) => `/authorized${path}` !== pathname).map(({ path, title }) => (
            <Link key={path} href={`/authorized${path}`}>
              <Button variant='link' className='underline'>
                {title}
              </Button>
            </Link>
          ))}
      </div>
      <div className='flex items-center gap-2'>
        {!isLoading ? me?.name : <Skeleton className='h-4 w-20' />}
        <ThemeToggle />
      </div>
    </header>
  );
};
