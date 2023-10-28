import { request } from '@/api/instance/instance';

export const loginServices = async (data) => {
  try {
    const response = await request.post('/auth/login', data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
