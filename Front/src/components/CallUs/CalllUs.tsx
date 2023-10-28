import React from 'react';

function CalllUs() {
  return (
    <>
      <div className="bg-primary pt-20 h-full">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">
            تماس با ما
          </h1>
          <div className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-xl font-bold mb-4">آدرس</h2>
            <p className="text-gray-700">
              در این قسمت، آدرس دقیق شرکت یا محل مستقر شدن موسسه خود را بنویسید.
              اگر چندین شعبه دارید، هر یک را جداگانه معرفی کنید.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">شماره تماس</h2>
            <p className="text-gray-700">
              شماره تلفن ثابت و موبایلی که مشتریان می‌توانند از آن با شما تماس
              بگیرند را در این قسمت قرار دهید.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">ایمیل</h2>
            <p className="text-gray-700">
              آدرس ایمیلی که مشتریان می‌توانند از طریق آن با شما در ارتباط باشند
              را در این قسمت قرار دهید. اگر برای هر بخش از کسب و کار خود آدرس
              ایمیل جداگانه دارید، آنها را نیز معرفی کنید.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">فرم تماس</h2>
            <p className="text-gray-700">
              می‌توانید فرم تماسی برای مشتریان و بازدیدکنندگان وبسایت خود ایجاد
              کنید. در این فرم، اطلاعات مورد نیاز مشتریان را جمع آوری کنید و
              راه‌های ارتباطی دیگری که می‌توانند با شما در ارتباط باشند را اعلام
              کنید.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CalllUs;
