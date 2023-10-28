import { request } from '@/library/axios/axios';
// import { getProductQueryFnInput } from '@/types';

async function getProductService({ page, pageSize, field, sort }: any) {
  let URL = `products?page=${
    page + 1
  }&limit=${pageSize}&fields=-rating,-createdAt,-updatedAt,-__v&&quantity[gte]=8`;
  let sortValue = '';

  if (field) {
    sort === `asc` ? (sortValue += `${field}`) : (sortValue += `-${field}`);
    URL += `&sort=${sortValue}`;
  }
  const res = await request(URL);

  return res.data;
}

export default getProductService;
