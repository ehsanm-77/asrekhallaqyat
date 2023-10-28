import TermsOfServices from '@/components/TermsOfServices/TermsOfServices';
import MainLayout from '@/layout/mainLayout';
import React, { ReactElement } from 'react';

export default function TermsOfUse() {
  return (
    <>
      <TermsOfServices />
    </>
  );
}

TermsOfUse.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
