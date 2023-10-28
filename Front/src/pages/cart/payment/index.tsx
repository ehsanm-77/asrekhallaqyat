import { request } from '@/api/instance/instance';
import useRedux from '@/hooks/usRedux';
import { CLEARALL } from '@/redux/slice/userSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';

const Payment = () => {
  const [value, dispatch] = useRedux((state) => state.userState);
  const router = useRouter();

  const handleAddOrder = async () => {
    try {
      await request.post('/orders', value.FinalOrders);
      router.push('/cart/payment/success');
      dispatch(CLEARALL({}));
    } catch (error) {
      router.push('/cart/payment/fail');
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-3 bg-primary">
      <div className="flex items-center justify-center bg-blue-100 flex-col gap-10 w-3/4 md:w-1/2 shadow-md p-10 rounded-xl border">
        <Image
          src={'/assets/img/cart/undraw_credit_card_re_blml.svg'}
          alt="سبد خرید"
          width={300}
          height={200}
        />
        <div className="text-blue-900 border-b-2 border-blue-900 pb-2">
          <span>مبلغ قابل پرداخت : </span>
          <span>{Intl.NumberFormat('fa-IR').format(value.Total)} تومان</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleAddOrder}
          >
            پرداخت
          </button>
          <Link href="/cart/payment/fail">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded"
            >
              انصراف
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Payment;
