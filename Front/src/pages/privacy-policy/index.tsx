import Privacy from '@/components/Privacy/Privacy';
import MainLayout from '@/layout/mainLayout';
import React, { ReactElement } from 'react';

export default function PrivacyPolicy() {
  return (
    <>
      <Privacy />
    </>
  );
}

PrivacyPolicy.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
