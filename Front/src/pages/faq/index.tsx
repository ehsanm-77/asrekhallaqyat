import MainLayout from '@/layout/mainLayout';
import React, { ReactElement } from 'react';

export default function FAQ() {
  return (
    <div className="bg-primary pt-20 h-full">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">
          سوالات متداول
        </h1>
        <div className="bg-white p-6 rounded-lg shadow text-gray-700">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">سوال 1؟</h2>
            <p className="text-gray-700">پاسخ به سوال 1 را اینجا بنویسید.</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">سوال 2؟</h2>
            <p className="text-gray-700">پاسخ به سوال 2 را اینجا بنویسید.</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">سوال 3؟</h2>
            <p className="text-gray-700">پاسخ به سوال 3 را اینجا بنویسید.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

FAQ.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
