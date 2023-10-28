import { fetchData } from '@/services/fetchDataServices';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useGetSubCategory = (
  options: UseQueryOptions<SubCategoryData, unknown, any, any>
) => {
  return useQuery<SubCategoryData>({
    ...options,
    queryKey: ['subcategory'],
    queryFn: () => fetchData(`/subcategories`),
  });
};
