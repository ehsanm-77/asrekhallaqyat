import { request } from '@/api/instance/instance';

export const fetchData = async (url: string) => {
  try {
    const response = await request.get(url);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
