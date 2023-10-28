import ProductPage from '@/components/Products/ProductsPage';
import MainLayout from '@/layout/mainLayout';
import React, { ReactElement } from 'react';

export default function Products() {
  return (
    <div className="bg-primary h-full">
      <ProductPage />
    </div>
  );
}
Products.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
