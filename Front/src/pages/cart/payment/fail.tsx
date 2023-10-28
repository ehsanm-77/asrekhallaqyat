import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/layout/mainLayout';

const Fail = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 md:p-10 p-20 bg-primary">
      <h2 className="text-center text-3xl font-bold mb-4">
        متاسفانه پرداخت شما ناموفق بود
      </h2>
      <Image
        src={'/assets/img/cart/undraw_access_denied_re_awnf.svg'}
        alt="سبد خرید"
        width={300}
        height={200}
      />
      <p className="text-center text-lg text-gray-600 mb-8">
        متاسفانه در هنگام پرداخت خطایی رخ داده است.
      </p>
      <Link
        className="hover:bg-blue-500 bg-blue-400 rounded-lg p-2 text-white"
        href="/cart"
        passHref
      >
        بازگشت به صفحه سبد خرید
      </Link>
    </div>
  );
};

export default Fail;

Fail.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
