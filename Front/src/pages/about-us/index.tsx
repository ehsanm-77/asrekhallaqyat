import MainLayout from '@/layout/mainLayout';
import React, { ReactElement } from 'react';
import About from '@/components/AboutUs/AboutUs';
export default function AboutUs() {
  return (
    <>
      <About />
    </>
  );
}

AboutUs.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
