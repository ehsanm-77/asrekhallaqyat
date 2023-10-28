import React from 'react';

function About() {
  return (
    <>
      <div className="bg-primary pt-20 md:pt-10 h-full">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">
            درباره ما
          </h1>
          <div className="bg-white p-6 rounded-lg shadow text-garay-700">
            <h2 className="text-xl font-bold mb-4">ما کی هستیم؟</h2>
            <p className="text-gray-700">
              در این قسمت می‌توانید توضیحی کوتاه و شیرین درباره شرکت یا تیم خود
              بنویسید. اینجا مکانی است برای معرفی هدف، ماموریت، وارزش‌ها و تمایز
              شما از سایر رقبا.
            </p>
            <h2 className="text-xl font-bold mt-8 mb-4">
              چه خدماتی ارائه می‌دهیم؟
            </h2>
            <p className="text-gray-700">
              در این قسمت می‌توانید خدمات، محصولات یا راه‌حل‌هایی را که شما به
              مشتریان خود ارائه می‌دهید، معرفی کنید. توضیح دهید چگونه مشتریان از
              خدمات شما بهره‌مند می‌شوند و چرا شما را انتخاب کنند.
            </p>
            <h2 className="text-xl font-bold mt-8 mb-4">تیم ما</h2>
            <p className="text-gray-700">
              در این بخش، می‌توانید اعضای تیم خود را معرفی کنید و نقش و وظایف هر
              فرد را توضیح دهید. به عنوان مثال، می‌توانید تجربه و تخصص هر عضو را
              بیان کنید و از تصاویر و اطلاعات تماس آنها استفاده کنید.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
