import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/services/fetchDataServices';

function useGetProduct() {
  return useQuery({
    queryKey: ['GetProduct'],
    queryFn: () => fetchData(`/products`),
  });
}

export default useGetProduct;
