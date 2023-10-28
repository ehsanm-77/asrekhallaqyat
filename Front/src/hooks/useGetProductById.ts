import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { fetchData } from '@/services/fetchDataServices';

function useGetProductById(
  options: any,
  id: any
): UseQueryResult<ProductSecProps> {
  return useQuery({
    ...options,
    queryKey: ['GetAllProductById', id],
    queryFn: () => fetchData(`/products/${id}`),
  });
}

export default useGetProductById;
