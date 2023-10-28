import { useQuery } from '@tanstack/react-query';
import getOrdersService from '../services/getOrdersService';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

export const useGetOrders = () => {
  const { page, deliveryStatus, pageSize } = useSelector(
    (state: RootState) => state.orderSlice
  );

  return useQuery(['orders', page, pageSize, deliveryStatus], () =>
    getOrdersService({ page, deliveryStatus, pageSize })
  );
};
