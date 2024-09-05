'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '@/lib/http-client';
import { ChangePasswordPayload, MeUser, SafeUser } from './types';
import { useEffect } from 'react';

export const useMe = () =>
  useQuery({
    queryKey: ['me'],
    queryFn: () => httpClient.get<MeUser>('/me', { cache: 'no-store' })
  });

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ChangePasswordPayload) => httpClient.post('/change-password', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    }
  });
};

let usersConsumersCount = 0;
let usersInterval: ReturnType<typeof setInterval> | null = null;

export const useUsers = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (usersConsumersCount === 0) {
      usersInterval = setInterval(() => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      }, 5 * 1000);
    }
    usersConsumersCount++;
    return () => {
      usersConsumersCount--;
      if (usersConsumersCount === 0 && usersInterval) {
        clearInterval(usersInterval);
        usersInterval = null;
      }
    };
  }, []);

  return useQuery({
    queryKey: ['users'],
    queryFn: () => httpClient.get<SafeUser[]>('/users')
  });
};

export const useUpdateBooks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: string[]) => httpClient.post('/update-books', { books: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    }
  });
};
