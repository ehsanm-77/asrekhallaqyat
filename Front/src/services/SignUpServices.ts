import { request } from '@/api/instance/instance';

export const SignUpServices = async (data: FormData) => {
  try {
    const response = await request.post('/auth/signup', data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
