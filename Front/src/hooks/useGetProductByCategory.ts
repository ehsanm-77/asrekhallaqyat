import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/services/fetchDataServices';

function useGetProductByCategory(categorId) {
  return useQuery({
    queryKey: ['GetProductByCategory', categorId],
    queryFn: () => fetchData(`/products?category=${categorId}`),
  });
}

export default useGetProductByCategory;
