import { httpClient } from '@/lib/http-client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Spin } from './types';

export const useSaveRandomizationResult = () =>
  useMutation({
    mutationFn: (book: string) => httpClient.post('/save-randomization-result', { book })
  });

export const useSpins = () =>
  useQuery({
    queryKey: ['spins'],
    queryFn: () => httpClient.get<Spin[]>('/spins')
  });
