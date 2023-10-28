import { SignUpServices } from '@/services/SignUpServices';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const useSignUp = (options: UseMutationOptions<any, any, any>) => {
  return useMutation({
    ...options,
    mutationKey: ['signup'],
    mutationFn: (data) => SignUpServices(data),
  });
};

export default useSignUp;
