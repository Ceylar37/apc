import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { SafeUser } from '@/entities/user';
import { Skeleton } from './ui/skeleton';

export const UserCard = ({ name, books, className }: SafeUser & { className?: string }) => {
  return (
    <Card className={className}>
      <CardHeader className='text-2xl'>{name}</CardHeader>
      <CardContent>
        <ul>
          {books?.map((book, index) => (
            <li key={index}>
              book {index + 1}: {book}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export const UserCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <Skeleton className='h-8 w-24' />
      </CardHeader>
      <CardContent>
        <ul className='space-y-3'>
          <li>
            <Skeleton className='h-4 w-full md:w-40' />
          </li>
          <li>
            <Skeleton className='h-4 w-full md:w-40' />
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
