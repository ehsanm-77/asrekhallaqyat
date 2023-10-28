import Loading from '@/components/Loading/Loading';
import { useLogin } from '@/hooks/useLogin';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isLoading } = useLogin({});
  const onSubmit = (data: FormData) => {
    console.log(data);
    mutate(data);
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full flex flex-col justify-between"
      >
        <div>
          <div className="mb-3">
            <label htmlFor="username" className="block mb-2 text-gray-800">
              نام کاربری
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              type="text"
              id="username"
              {...register('username', { required: 'نام کاربری الزامیست' })}
            />
            {errors.username && (
              <span className="text-red-500 mt-2 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-gray-800">
              رمز عبور
            </label>
            <div className="relative">
              <input
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password', {
                  required: 'رمز عبور الزامیست',
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message:
                      'رمز عبور باید حداقل 8 کاراکتر شامل حروف و اعداد باشد',
                  },
                })}
              />
              <div
                className="absolute top-1/2 left-3 transform -translate-y-1/2 focus:outline-none cursor-pointer"
                onClick={handlePasswordToggle}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </div>
            </div>
            {errors.password && (
              <span className="text-red-500 mt-2 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <button
            className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none"
            type="submit"
          >
            ورود
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
