import React, { useEffect, useState } from 'react';
import Form from './form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import finalForm from '@/schemas/finalForm';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { FINALORDER } from '@/redux/slice/userSlice';
import useRedux from '@/hooks/usRedux';
interface props {
  userData: any;
}
interface IFormInput {
  firstName: String;
  lastName: String;
  email: String;
  date: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  phoneNumber: string;
}
const Index = ({ userData }: props) => {
  const [datePicker, setDate] = useState('');
  const router = useRouter();
  const [value, dispatch] = useRedux((state) => state.userState);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(finalForm),
    mode: 'all',
  });
  const onSubmit = (data) => {
    const userId = getCookie('id');

    const productsHandle = value.cart.map((item) => {
      const obj = {
        product: item.data._id,
        count: item.quantity,
      };
      return obj;
    });

    const DATA = {
      user: userData._id,
      deliveryDate: +data.date * 1000,
      products: productsHandle,
      deliveryStatus: false,
    };
    dispatch(FINALORDER({ data: DATA }));
    router.push('/cart/payment');
  };
  useEffect(() => {
    setValue('city', '');
    setValue('address', userData.address);
    setValue('postalCode', '');
    setValue('firstName', userData.firstname);
    setValue('lastName', userData.lastname);
    setValue('phoneNumber', +userData.phoneNumber);
  }, []);
  return (
    <div className="rounded-xl w-2/3 bg-white shadow-md">
      <h2 className="bg-[#009dae] p-3 rounded-t-xl text-white flex justify-center">
        نهایی کردن خرید
      </h2>
      <div className="p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form
            userData={userData}
            control={control}
            errors={errors}
            setDate={setDate}
            setValue={setValue}
          />
        </form>
      </div>
    </div>
  );
};

export default Index;
