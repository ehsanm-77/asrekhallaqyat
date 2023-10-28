import { useGetCategory } from '@/hooks/useGetCategory';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const TopHomePage = () => {
  const { data } = useGetCategory({});
  const category = data?.categories?.map((category) => category);

  const getGradientColor = () => {
    const colors = [
      'bg-gradient-to-r from-red-300 to-orange-500',
      'bg-gradient-to-r from-orange-300 to-yellow-500',
      'bg-gradient-to-r from-yellow-300 to-green-500',
      'bg-gradient-to-r from-green-300 to-teal-500',
      'bg-gradient-to-r from-teal-300 to-blue-500',
      'bg-gradient-to-r from-blue-300 to-indigo-500',
      'bg-gradient-to-r from-indigo-300 to-purple-500',
      'bg-gradient-to-r from-purple-300 to-pink-500',
      'bg-gradient-to-r from-pink-300 to-red-500',
      'bg-gradient-to-r from-blue-200 to-blue-500',
      'bg-gradient-to-r from-green-200 to-green-500',
      'bg-gradient-to-r from-yellow-200 to-yellow-500',
      'bg-gradient-to-r from-purple-200 to-purple-500',
      'bg-gradient-to-r from-pink-200 to-pink-500',
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div className="flex flex-col justify-center items-center mb-8 bg-primary p-10">
      <div className="pb-8 font-bold text-xl text-[#61729e] text-center">
        خرید و دانلود کتاب از انتشارات عصر خلاقیت
      </div>
      <div className="grid md:grid-cols-5 grid-cols-2 md:gap-12 gap-6">
        {category &&
          category.map((category) => (
            <Link href={`/category/${category.slugname}`} key={category._id}>
              <div
                className={`px-2 py-5 rounded-full text-white w-32 hover:scale-110 shadow-md cursor-pointer text-center ${getGradientColor()}`}
              >
                {category.name}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default TopHomePage;
