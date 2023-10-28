import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/services/fetchDataServices';

function useGetAllProducts(options, price) {
  return useQuery({
    queryKey: ['GetAllProduct', price],
    queryFn: () => fetchData(`/products?sort=${price}&limit=all`),
  });
}

export default useGetAllProducts;
