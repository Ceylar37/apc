'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChangePasswordPayload, useChangePassword } from '@/entities/user';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';

export const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangePasswordPayload>();
  const { mutateAsync: changePassword, error } = useChangePassword();

  const onSubmit = handleSubmit(async (values) => {
    await changePassword(values);
  });

  return (
    <form onSubmit={onSubmit} className='max-w-[400px] flex flex-col space-y-2.5 p-4'>
      <label htmlFor='password' className={cn(errors.password && 'text-red-500')}>
        Old password
        <Input
          {...register('password', { required: true, minLength: 3 })}
          id='password'
          type='password'
          autoComplete='current-password'
        />
      </label>
      <label htmlFor='newPassword' className={cn(errors.newPassword && 'text-red-500')}>
        New password
        <Input
          {...register('newPassword', { required: true, minLength: 3 })}
          id='newPassword'
          type='password'
          autoComplete='new-password'
        />
      </label>
      <div className='h-[20px] text-red-500'>{error && 'Incorrect password'}</div>
      <Button>Save</Button>
    </form>
  );
};
