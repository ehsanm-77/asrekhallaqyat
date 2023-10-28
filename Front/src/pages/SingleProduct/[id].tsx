import MainLayout from '@/layout/mainLayout';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import Example from '@/components/SinglePruduct/Tab/Tab';
import SampleProducts from '@/components/SinglePruduct/SampleProducts/SampleProducts';
import useGetProductById from '@/hooks/useGetProductById';
import Loading from '@/components/Loading/Loading';
import ProductSec from '@/components/SinglePruduct/ProductSec/ProductSec';

const SingleProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useGetProductById({}, id);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-blue-100 h-full">
      <div className="w-full bg-[#d4fcf8] flex flex-col items-center">
        {data && <ProductSec product={data.product} />}
        {data && <Example product={data?.product} />}
        {data && <SampleProducts product={data.product} />}
      </div>
    </div>
  );
};

export default SingleProduct;

SingleProduct.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
