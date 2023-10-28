import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/layout/mainLayout';

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full md:p-[40px] gap-3 bg-primary p-[60px]">
      <h2 className="text-3xl font-bold mb-4">پرداخت شما با موفقیت انجام شد</h2>
      <Image
        src={'/assets/img/cart/undraw_done_re_oak4.svg'}
        alt="سبد خرید"
        width={300}
        height={200}
      />
      <p className="text-lg text-gray-600 mb-8">
        با تشکر از خرید شما! امیدواریم از محصولاتتان راضی باشید.
      </p>
      <Link
        className="hover:bg-blue-500 bg-blue-400 rounded-lg p-2 text-white"
        href="/"
        passHref
      >
        برگشت به صفحه اصلی
      </Link>
    </div>
  );
};

export default Success;
Success.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
