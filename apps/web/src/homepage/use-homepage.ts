import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';

export function useHomepage() {
  return useQuery({ queryKey: ['homepage'], queryFn: api.homepage });
}
