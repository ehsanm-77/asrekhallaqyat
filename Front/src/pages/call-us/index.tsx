import CalllUs from '@/components/CallUs/CalllUs';
import MainLayout from '@/layout/mainLayout';
import React, { ReactElement } from 'react';

export default function ContactUs() {
  return (
    <>
      <CalllUs />
    </>
  );
}

ContactUs.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
