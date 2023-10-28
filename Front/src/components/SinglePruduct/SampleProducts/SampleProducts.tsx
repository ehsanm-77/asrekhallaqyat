import useGetProductByCategory from '@/hooks/useGetProductByCategory';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SampleProducts = ({ product }: ProductSecProps) => {
  const id = product?.category._id;

  const shuffleArray = (array: []) => {
    if (array !== undefined) {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ];
      }
      return shuffledArray;
    }
  };

  const { data: sampleProducts } = useGetProductByCategory(id);

  const randomProducts = shuffleArray(sampleProducts?.products)?.slice(0, 3);

  return (
    <div className="bg-white w-4/5 rounded-xl shadow-md pb-5 mb-10">
      <div className="flex justify-center bg-[#b0d6e2] rounded-t-xl p-3 text-blue-900">
        محصولات مشابه
      </div>
      <div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-10 p-5 w-[280px] md:w-full sm:w-full lg:w-full mx-auto">
          {randomProducts?.map((data: any) => {
            return (
              <div
                key={data._id}
                className="p-1 shadow-md border rounded-2xl flex flex-col justify-between items-center bg-[#f0f6f9] border-t-[#009DAE] border-t-8 mt-5 h-96"
              >
                <Link href={`/SingleProduct/${data._id}`}>
                  <Image
                    src={`http://${data?.images[0]}`}
                    alt={data.name}
                    width={150}
                    height={200}
                    className="mt-4  rounded-md md:w-60 md:h-60 h-44 w-44 md:mb-4 "
                  />
                </Link>
                <Link href={`/SingleProduct/${data._id}`}>
                  <h3 className="text-xl font-semibold text-slate-600">
                    {data.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between w-full p-2">
                  <p className="text-slate-600 mt-2 font-bold">
                    {data.subcategory.name}
                  </p>
                  <div className="flex items-center justify-around">
                    <p className="mt-2 text-blue-600 font-bold">
                      {data.price} تومان
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SampleProducts;
