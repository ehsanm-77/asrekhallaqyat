import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useGetAllProducts from '@/hooks/useGetAllProducts';
import Loading from '@/components/Loading/Loading';
function Product({
  price,
  selectedCategories,
  selectedSubcategories,
}: Products) {
  const { data: products, isLoading } = useGetAllProducts({}, price);
  const allProducts = products?.products;

  if (isLoading) {
    return (
      <div className="p-52">
        <Loading />
      </div>
    );
  }

  const filteredProducts = allProducts?.filter((product: EditedProduct) => {
    const isCategoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category.name);
    const isSubcategoryMatch =
      selectedSubcategories.length === 0 ||
      selectedSubcategories.includes(product.subcategory.name);
    return isCategoryMatch && isSubcategoryMatch;
  });

  return (
    <>
      <div className=" rounded-md shadow-md bg-white">
        <div className="rounded-t-md p-5 mb-5 flex justify-center text-3xl font-bold border-b-2 shadow-md bg-secondary text-blue-900">
          محصولات
        </div>
        <div className="">
          {filteredProducts?.length === 0 ? (
            <div className="">
              <div className="flex justify-center items-center mt-10">
                <Image
                  src={'/assets/img/products/undraw_no_data_re_kwbl.svg'}
                  alt="سبد خرید"
                  width={150}
                  height={200}
                  className="mt-4 rounded-md md:w-60 md:h-60 h-44 w-44 md:p-4"
                />
              </div>

              <div className="flex justify-center items-center text-center text-red-500 p-16">
                محصولی وجود ندارد
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-10 p-5 w-[300px] md:w-full sm:w-full lg:w-full mx-auto">
              {filteredProducts?.map((product: EditedProduct) => (
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
                      className="mt-4 object-cover rounded-md md:w-60 md:h-60 h-44 w-44 mb-2"
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
          )}
        </div>
      </div>
    </>
  );
}

export default Product;
