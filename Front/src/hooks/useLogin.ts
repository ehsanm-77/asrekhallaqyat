import { loginServices } from '@/services/loginServices';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const useLogin = (options: UseMutationOptions<any, any, any>) => {
  const router = useRouter();
  return useMutation({
    ...options,
    mutationKey: ['login'],
    mutationFn: (data) => loginServices(data),
    onSuccess(data) {
      if (data.status === 'success' && data.data.user.role === 'ADMIN') {
        cookies.set('accessToken', data.token.accessToken);
        cookies.set('refreshToken', data.token.refreshToken);
        cookies.set('role', data.data.user.role);
        localStorage.setItem('userInfo', JSON.stringify(data.data.user));
        router.push('/admin');
        toast.success('با موفقیت وارد شدید', { autoClose: 2000 });
      } else if (data.data.user.role === 'USER') {
        cookies.set('accessToken', data.token.accessToken);
        cookies.set('refreshToken', data.token.refreshToken);
        cookies.set('role', data.data.user.role);
        localStorage.setItem('userInfo', JSON.stringify(data.data.user));
        router.push('/');
        toast.success('با موفقیت وارد شدید', { autoClose: 2000 });
      } else {
        toast.error('نام کاربری  یا رمز عبور را به صورت صحیح وارد کنید', {
          autoClose: 2000,
        });
      }
    },
    onError() {
      toast.error('نام کاربری  یا رمز عبور را به صورت صحیح وارد کنید', {
        autoClose: 2000,
      });
    },
  });
};
