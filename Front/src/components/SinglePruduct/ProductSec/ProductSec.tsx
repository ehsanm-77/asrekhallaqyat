import React from 'react';
import ButtonCart from '@/components/SinglePruduct/Button/ButtonCart';
import Image from 'next/image';

function ProductSec({ product }: ProductSecProps) {
  console.log(product);
  return (
    <>
      <div className="p-10 flex flex-col justify-center md:flex-row gap-20 shadow-md w-4/5 rounded-xl  mt-20 md:mt-14 bg-white border-t-[#009DAE] border-t-8">
        <div className="flex flex-col lg:flex-row w-full justify-between">
          <div className="flex gap-5 md:flex-row flex-col justify-center items-center md:items-start">
            <Image
              src={`http://${product?.images[0]}`}
              alt="Product Thumbnail"
              className="w-52 h-auto mb-4 rounded-lg shadow-xl md:w-72 border border-white"
              width={600}
              height={600}
            />
            <div className=" flex flex-col gap-3">
              <p className="text-2xl w-full text-center text-slate-600">
                {product?.name}
              </p>
              <p className="text-lg text-slate-600">
                <span className="font-bold"> - دسته بندی :</span>{' '}
                {product?.category.name}
              </p>
              <p className=" text-lg text-slate-600">
                <span className="font-bold"> - انتشارات : </span>{' '}
                {product?.brand}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between md:p-3 rounded-md p-3 pt-8">
            <div className="flex flex-col mb-4">
              <span className="text-blue-900 text-lg">
                <span className="font-bold"> قیمت: </span> {product?.price}{' '}
                تومان
              </span>
              <span className="text-blue-900 px-1 py-1 rounded-md">
                <span className="font-bold"> موجودی: </span> {product?.quantity}{' '}
                عدد
              </span>
            </div>
            <div className="w-full flex justify-center">
              <ButtonCart quantity={product?.quantity} data={product} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductSec;
