'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginPayload } from '@/entities/user';
import { httpClient } from '@/lib/http-client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { register, handleSubmit } = useForm<LoginPayload>();
  const router = useRouter();
  const [error, setError] = useState<string>('');

  const onSubmit = handleSubmit(async (values) => {
    setError('');
    try {
      await httpClient.post('/login', values);
      router.push('/authorized');
    } catch (error) {
      setError('Неверный логин или пароль');
    }
  });

  return (
    <form onSubmit={onSubmit} className='flex w-full max-w-[400px] flex-col space-y-2.5 p-4 -mt-32'>
      <label htmlFor='name'>
        Your name
        <Input {...register('name', { required: true })} id='name' />
      </label>
      <label htmlFor='password'>
        Password
        <Input {...register('password', { required: true })} id='password' type='password' />
      </label>
      <div className='text-red-500 h-[20px]'>{error}</div>
      <Button type='submit'>Login</Button>
    </form>
  );
}
