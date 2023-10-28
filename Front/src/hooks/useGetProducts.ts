import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import getProductService from '@/services/getProductService';
import { RootState } from '@/redux/store/store';

function useGetProducts() {
  const { page, pageSize, field, sort } = useSelector(
    (state: RootState) => state.productSlice
  );
  return useQuery({
    queryKey: ['GetProduct', page, pageSize, field, sort],
    queryFn: () => getProductService({ page, pageSize, field, sort }),
  });
}

export default useGetProducts;
