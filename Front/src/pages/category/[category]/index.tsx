import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import NotFound from '../../404';
import MainLayout from '@/layout/mainLayout';
import Link from 'next/link';
import Image from 'next/image';

const Category = () => {
  const [categoryData, setCategoryData] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const router = useRouter();
  const { category } = router.query;

  useEffect(() => {
    if (categoryId) {
      axios
        .get(`http://localhost:8000/api/products?category=${categoryId}`)
        .then((response) => {
          const categories = response?.data?.data?.products;
          const categoryData = categories.find(
            (cat: any) => cat.slugname === category
          );
          setCategoryData(categories);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [categoryId]);

  useEffect(() => {
    if (category) {
      axios
        .get(`http://localhost:8000/api/categories`)
        .then((response) => {
          const categories = response?.data?.data?.categories;
          const categoryData = categories.find(
            (cat: any) => cat.slugname === category
          );
          setCategoryId(categoryData._id);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [category]);

  return (
    <div className="bg-[#d4fcf8] h-full">
      <div className="flex bg-myproduct bg-cover bg-center justify-between items-center w-full mb-5">
        <div className="flex items-center ">
          <div className="h-6 w-1 bg-[#61729e] mr-5 rounded-full"></div>
          <h2 className="text-[#61729e] font-bold mb-4  rounded-md my-4 mx-2 text-sm sm:text-xl">
            {categoryData && categoryData[0]?.category?.name}
          </h2>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-10 p-5 w-[300px] md:w-full sm:w-full lg:w-full mx-auto">
        {categoryData?.map((data: any) => {
          return (
            <>
              <div
                key={data._id}
                className="p-1 shadow-md border rounded-2xl flex flex-col justify-between items-center bg-[#f0f6f9] border-t-[#009DAE] border-t-8"
              >
                <Link href={`/SingleProduct/${data._id}`}>
                  <Image
                    src={`http://${data.images[0]}`} // Add a leading slash ("/")
                    alt={data.name}
                    width={150}
                    height={200}
                    className="mt-4 rounded-md md:w-60 md:h-60 h-44 w-44 md:p-4"
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
            </>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { category } = query;
  try {
    // Perform a database query or API call to check if the category exists
    const response = await axios.get(`http://localhost:8000/api/categories`);
    const categories = response?.data?.data?.categories;
    const categoryData = categories.find(
      (cat: any) => cat.slugname === category
    );
    if (categoryData) {
      return {
        props: {},
      };
    } else {
      return {
        redirect: {
          destination: '/404',
          permanent: false,
        },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
};

export default Category;

Category.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
