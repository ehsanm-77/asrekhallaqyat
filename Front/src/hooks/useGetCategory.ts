import { fetchData } from '@/services/fetchDataServices';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useGetCategory = (options: UseQueryOptions<CategoryData>) => {
  return useQuery<CategoryData>({
    ...options,
    queryFn: () => fetchData('/categories'),
  });
};
