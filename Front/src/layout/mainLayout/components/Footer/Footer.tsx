import Link from 'next/link';

const Footer = () => {
  return (
    <div className="bg-secondary relative bottom-0  w-full py-5 flex flex-col justify-center items-center gap-3">
      <div className="flex w-full">
        <ul className="flex justify-center gap-5 items-center text-blue-900 w-full">
          <li className="sm:px-2 text-center">
            <Link
              className="hover:text-white  hidden md:block"
              href="/privacy-policy"
            >
              سیاست حفظ حریم خصوصی
            </Link>
          </li>
          <li className="md:px-2 px-1  text-center">
            <Link
              className="hover:text-white  hidden md:block"
              href="/terms-of-service"
            >
              شرایط استفاده
            </Link>
          </li>
          <li className=" md:px-2 px-1 text-center flex justify-center">
            <Link className="hover:text-white " href="/faq">
              سوالات متداول
            </Link>
          </li>
          <li className="px-2 text-center">
            <Link className="hover:text-white " href="/call-us">
              تماس با ما
            </Link>
          </li>
        </ul>
      </div>
      <div className=" text-blue-900">
        <p>
          کلیه ی حقوق این سایت محفوظ و متعلق به انتشارات عصر خلاقیت می باشد.
        </p>
      </div>
    </div>
  );
};

export default Footer;
