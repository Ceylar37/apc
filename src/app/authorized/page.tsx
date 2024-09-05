'use client';

import { UserCard, UserCardSkeleton } from '@/components/UserCard';
import { useUsers } from '@/entities/user';
import { EditableUserCard } from '@/features/edit-user-books';
import { RandomizeBookButton } from '@/features/randomize-book';

export default function Main() {
  const { data: users } = useUsers();

  return (
    <>
      <div className='w-full flex justify-end'>
        <RandomizeBookButton />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3'>
        <EditableUserCard className='md:col-span-4 lg:col-span-1' />
        {users?.map((user) => <UserCard key={user.id} {...user} />) ??
          new Array(4).fill(null).map((_, index) => <UserCardSkeleton key={index} />)}
      </div>
    </>
  );
}
