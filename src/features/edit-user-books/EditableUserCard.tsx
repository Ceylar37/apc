import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useMe, USER_BOOKS_COUNT, useUpdateBooks } from '@/entities/user';
import React, { useEffect, useId } from 'react';
import { useForm } from 'react-hook-form';
import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const items = new Array(USER_BOOKS_COUNT).fill(null);

export const EditableUserCard = ({ className }: { className?: string }) => {
  const { data: me } = useMe();
  const id = useId();
  const {
    register,
    getValues,
    formState: { isDirty },
    reset
  } = useForm({ defaultValues: Object.fromEntries((me?.books ?? []).entries()) });
  const { mutateAsync, isPending } = useUpdateBooks();

  useEffect(() => {
    if (!me) {
      return;
    }

    const filledToMaxBooks = [...me.books];
    while (filledToMaxBooks.length < USER_BOOKS_COUNT) {
      filledToMaxBooks.push('');
    }

    reset(Object.fromEntries(filledToMaxBooks.entries()));
  }, [me]);

  const onSave = () => {
    mutateAsync(Object.values(getValues()));
  };

  return (
    <Card className={cn('md:h-full', className)}>
      <CardHeader className='text-2xl'>My Books</CardHeader>
      <CardContent>
        <ul className='space-y-3'>
          {me
            ? items.map((_, index) => (
                <li key={index} className='flex items-center gap-2'>
                  <label htmlFor={id + index}>Book {index + 1}:</label>
                  <Input {...register(String(index))} id={id + index} disabled={isPending} className='flex-1' />
                </li>
              ))
            : items.map((_, index) => (
                <li key={index} className='flex items-center gap-2'>
                  <Skeleton className='h-4 w-20 md:w-32' />
                  <Skeleton className='h-8 w-full md:w-32' />
                </li>
              ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant={'outline'} disabled={!isDirty || isPending} onClick={onSave} className='w-28'>
          {isPending ? <LoaderCircle className='w-6 animate-spin' /> : 'Сохранить'}
        </Button>
      </CardFooter>
    </Card>
  );
};
