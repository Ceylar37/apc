'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '@/lib/http-client';
import { ChangePasswordPayload, MeUser, SafeUser } from './types';

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

export const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => httpClient.get<SafeUser[]>('/users')
  });

export const useUpdateBooks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: string[]) => httpClient.post('/update-books', { books: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    }
  });
};
