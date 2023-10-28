import React from 'react';
import Link from 'next/link';
import useGetProduct from '@/hooks/useGetProduct';
import Image from 'next/image';

const MyProduct = () => {
  const { data } = useGetProduct();
  const myProducts: Product[] = data?.products;

  const shuffledProducts = React.useMemo(() => {
    if (myProducts) {
      const shuffled = [...myProducts].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 8);
    }
    return [];
  }, [myProducts]);

  return (
    <div className="">
      <div className="flex bg-myproduct bg-cover bg-center justify-between items-center w-full mb-5">
        <div className="flex items-center ">
          <div className="h-6 w-1 bg-[#61729e] mr-5 rounded-full"></div>
          <h2 className="text-xl text-[#61729e] font-bold mb-4  rounded-md my-4 mx-2">
            محصولات
          </h2>
        </div>

        <Link
          className=" text-[#61729e] font-bold mb-4  rounded-md my-4 mx-5"
          href="/products"
        >
          مشاهده همه ...
        </Link>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-10 p-5 w-[300px] md:w-full sm:w-full lg:w-full mx-auto">
        {shuffledProducts.map((product) => (
          <div
            key={product._id}
            className="p-1 shadow-md border rounded-2xl flex flex-col justify-between items-center bg-[#f0f6f9] border-t-[#009DAE] border-t-8 h-96"
          >
            <Link href={`/SingleProduct/${product._id}`}>
              <Image
                src={`http://${product.images[0]}`}
                alt={product.name}
                width={150}
                height={200}
                className="mt-4 object-cover rounded-md md:w-60 md:h-60 h-44 w-44 md:p-4"
              />
            </Link>
            <Link href={`/SingleProduct/${product._id}`}>
              <h3 className="text-xl font-semibold text-slate-600">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center justify-between w-full p-2">
              <p className="text-slate-600 mt-2 font-bold">
                {product.subcategory.name}
              </p>
              <div className="flex items-center justify-around">
                <p className="mt-2 text-blue-600 font-bold">
                  {product.price} تومان
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProduct;
