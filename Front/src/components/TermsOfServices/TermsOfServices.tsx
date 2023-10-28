import React from 'react';

function TermsOfServices() {
  return (
    <>
      <div className="bg-primary md:pt-10 pt-20 h-full">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">
            شرایط استفاده
          </h1>
          <div className="bg-white text-gray-700 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">قبول شرایط استفاده</h2>
            <p className="text-gray-700">
              با استفاده از این وبسایت، شما موافقت می‌کنید که به شرایط استفاده
              زیر پایبند باشید. در صورتی که با هر بخش از این شرایط موافق نیستید،
              توصیه می‌شود از استفاده از وبسایت صرف نظر کنید.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">محدودیت مسئولیت</h2>
            <p className="text-gray-700">
              مطالب و اطلاعات موجود در این وبسایت به صورت همانطور که هست ارائه
              می‌شوند. هرگونه استفاده از این مطالب و اطلاعات با مسئولیت کاربر
              صورت می‌گیرد و شرکت یا وبسایت هیچ گونه مسئولیتی در قبال دقت،
              کارایی یا صحت آنها ندارد.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">محدودیت استفاده</h2>
            <p className="text-gray-700">
              استفاده از این وبسایت صرفاً برای مقاصد قانونی مجاز است. هرگونه
              استفاده غیرقانونی، تجاوز به حقوق دیگران، توزیع ناخواسته محتوا یا
              هرگونه فعالیت مخالف با شرایط استفاده ممنوع است و می‌تواند به پیگرد
              قانونی منجر شود.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TermsOfServices;
