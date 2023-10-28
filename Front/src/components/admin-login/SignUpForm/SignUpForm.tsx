import Loading from '@/components/Loading/Loading';
import useSignUp from '@/hooks/useSignUp';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';

function SignUpForm({ switchToLogin }: { switchToLogin: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isLoading } = useSignUp({
    onSuccess(data) {
      data.status === 'success' &&
        toast.success('ثبت نام با موفقیت انجام شد') &&
        switchToLogin();
    },
    onError(data) {
      data.status !== 'success' &&
        toast.error(`نام کاربری یا شماره موبایل قبلا ثبت شده است`);
    },
  });

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex gap-1">
            <div className="mb-1 w-1/2">
              <label htmlFor="firstname" className="block mb-2 text-gray-800">
                نام
              </label>
              <input
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                  errors.firstname ? 'border-red-500' : 'border-gray-300'
                }`}
                type="text"
                id="firstname"
                {...register('firstname', {
                  required: 'نام الزامیست',
                  pattern: {
                    value: /^[آ-یa-zA-Z]{3,}$/,
                    message: 'نام باید حداقل 3 حرف باشد',
                  },
                })}
              />
              {errors.firstname && (
                <span className="text-red-500 mt-2 text-sm">
                  {errors.firstname.message}
                </span>
              )}
            </div>
            <div className="mb-1 w-1/2">
              <label htmlFor="lastname" className="block mb-2 text-gray-800">
                نام خانوادگی
              </label>
              <input
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                  errors.lastname ? 'border-red-500' : 'border-gray-300'
                }`}
                type="text"
                id="lastname"
                {...register('lastname', {
                  required: 'نام خانوادگی الزامیست',
                  pattern: {
                    value: /^[آ-یa-zA-Z]{3,}$/,
                    message: 'نام خانوادگی باید حداقل 3 حرف باشد',
                  },
                })}
              />
              {errors.lastname && (
                <span className="text-red-500 mt-2 text-sm">
                  {errors.lastname.message}
                </span>
              )}
            </div>
          </div>
          <div className="mb-1">
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

          <div className="mb-1">
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
          <div className="mb-1">
            <label htmlFor="phoneNumber" className="block mb-2 text-gray-800">
              شماره موبایل
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              type="text"
              id="phoneNumber"
              {...register('phoneNumber', {
                required: 'شماره موبایل الزامیست',
                pattern: {
                  value: /^\d{11}$/,
                  message: 'شماره تلفن باید 11 رقم باشد',
                },
              })}
            />
            {errors.phoneNumber && (
              <span className="text-red-500 mt-2 text-sm">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="address" className="block mb-2 text-gray-800">
              آدرس
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
              type="text"
              id="address"
              {...register('address', {
                required: 'آدرس الزامیست',
              })}
            />
            {errors.address && (
              <span className="text-red-500 mt-2 text-sm">
                {errors.address.message}
              </span>
            )}
          </div>
        </div>
        <button
          className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none"
          type="submit"
        >
          ثبت نام
        </button>
      </form>
    </>
  );
}

export default SignUpForm;
