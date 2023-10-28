import MainLayout from '@/layout/mainLayout';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Subcategory = () => {
  const router = useRouter();

  return <div>{router.query.subcategory}</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { subcategory } = query;
  try {
    const response = await axios.get('http://localhost:8000/api/subcategories');
    const subcategories = response?.data?.data?.subcategories;
    const subcategoryData = subcategories.find(
      (subcat: any) => subcat._id === subcategory
    );

    if (subcategoryData) {
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

export default Subcategory;
Subcategory.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
