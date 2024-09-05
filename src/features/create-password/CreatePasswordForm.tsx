'use client';

import { SubmitButton } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createPassword } from '@/entities/user';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

export const CreatePasswordForm = () => {
  const pathname = usePathname();
  const code = pathname?.split('/').at(-1);

  const {
    register,
    formState: { errors }
  } = useForm<{ name: string; newPassword: string }>();

  return (
    <form action={createPassword} className='flex w-full max-w-[400px] flex-col space-y-2.5 p-4 -mt-32'>
      <h1 className='text-3xl'>Registration</h1>
      <label htmlFor='name' className={cn(errors.name && 'text-red-500')}>
        Your name
        <Input {...register('name', { required: true, minLength: 4 })} id='name' autoComplete='name' />
      </label>
      <label htmlFor='newPassword' className={cn(errors.newPassword && 'text-red-500')}>
        Your new password
        <Input
          {...register('newPassword', { required: true, minLength: 4 })}
          id='newPassword'
          type='password'
          autoComplete='new-password'
        />
      </label>
      <Input name='code' value={code} type='hidden' />
      <SubmitButton>Submit</SubmitButton>
    </form>
  );
};
