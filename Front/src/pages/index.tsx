import MyProduct from '@/components/Home/MyProducts';
import SwiperMain from '@/components/Home/MySwipeableComponent';
import NewProduct from '@/components/Home/NewProducts';
import TopHomePage from '@/components/Home/TopHomePage';
import MainLayout from '@/layout/mainLayout';
import React, { ReactElement } from 'react';

const HomePage = () => {
  return (
    <div className=" h-full bg-primary">
      <TopHomePage />
      <h1 className=" text-[#61729e] font-bold mb-3 text-xl text-bold flex justify-center">
        پیشنهادهای ویژه
      </h1>
      <div className="flex flex-col gap-5">
        <SwiperMain />
        <NewProduct />
        <MyProduct />
      </div>
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
