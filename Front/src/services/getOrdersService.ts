import { request } from '@/api/instance/instance';

type FnInput = {
  page: number;
  deliveryStatus: boolean | undefined;
  pageSize: number;
};
async function getOrdersService({ page, deliveryStatus, pageSize }: FnInput) {
  const { data } = await request.get(
    `/orders?page=${page + 1}&limit=${pageSize}${
      deliveryStatus !== undefined ? '&deliveryStatus=' + deliveryStatus : ''
    }`
  );
  return data;
}

export default getOrdersService;
