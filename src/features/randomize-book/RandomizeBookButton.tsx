import { Button } from '@/components/ui/button';
import { useMe, useUpdateBooks, useUsers } from '@/entities/user';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Triangle } from 'lucide-react';
import { useSaveRandomizationResult } from '@/entities/spin';
import { useQueryClient } from '@tanstack/react-query';

export const RandomizeBookButton = () => {
  const { data: me, isPending: isMePending } = useMe();
  const { data: users, isPending: isUsersPending } = useUsers();
  const { isPending } = useUpdateBooks();
  const { mutateAsync: saveRandomizationResult } = useSaveRandomizationResult();
  const queryClient = useQueryClient();

  const isRandomizeAllowed =
    me?.books.length === 2 &&
    me?.books.every(Boolean) &&
    users?.every(({ books }) => books.length === 2 && books.every(Boolean));

  const [candidateBooks, setCandidateBooks] = useState<string[]>([]);

  const randomizeBook = () => {
    if (!isRandomizeAllowed) {
      return;
    }
    const books = [
      ...me!.books.map((book) => ({ book, userId: me!.id, winCount: me.winCount })),
      ...users!.flatMap((user) => user.books.map((book) => ({ book, userId: user.id, winCount: user.winCount })))
    ];
    const angle = 360 / books.length;
    const index = Math.floor(Math.random() * (books.length - 1));
    const winner = books[index];
    saveRandomizationResult(winner);
    setTimeout(() => {
      document.documentElement.style.setProperty('--rotation-deg', `${-720 - angle * (index + 1)}deg`);
    });
    setCandidateBooks(books.map(({ book }) => book));
  };

  const close = () => {
    setCandidateBooks([]);
    queryClient.invalidateQueries({ queryKey: ['me'] });
    queryClient.invalidateQueries({ queryKey: ['users'] });
    document.documentElement.style.setProperty('--rotation-deg', '0deg');
  };

  return (
    <>
      <Button
        variant='secondary'
        onClick={randomizeBook}
        disabled={!isRandomizeAllowed || isPending || isMePending || isUsersPending}
      >
        Randomize Book
      </Button>
      {candidateBooks.length > 0 &&
        createPortal(
          <div className='fixed top-0 left-0 w-full h-full bg-black/50' onClick={close}>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b flex flex-col roll'>
              {candidateBooks.map((book, index) => {
                return (
                  <span
                    className='absolute bg-[rgb(15,15,15)] text-2xl w-[50vw] flex items-center justify-center py-1'
                    key={index}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `translate(-50%, -50%) rotateX(${(index + 1) * (360 / candidateBooks.length)}deg) translateZ(50px)`
                    }}
                  >
                    {book}
                  </span>
                );
              })}
              {createPortal(<Triangle className='absolute top-1/2 left-1/2 triangle z-10' />, document.body)}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
