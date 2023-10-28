import MainCart from '@/components/Cart/cart/mainCart';
import useRedux from '@/hooks/usRedux';
import MainLayout from '@/layout/mainLayout';
import Image from 'next/image';
import Link from 'next/link';

const Main = () => {
  const [value, dispatch] = useRedux((state) => state.userState);
  const userId = JSON.parse(localStorage.getItem('userInfo'));
  if (value.cart.length <= 0) {
    return (
      <div className="flex py-10 items-center justify-center flex-col gap-2 h-full bg-primary">
        <div className="text-center text-2xl font-bold mb-4">
          سبد خرید شما خالی می باشد
        </div>
        <Image
          src={'/assets/img/cart/undraw_empty_cart_co35.svg'}
          alt="سبد خرید"
          width={300}
          height={200}
        />
        <div className="text-center mt-3">
          <p>
            سبد خرید شما خالی است. لطفاً محصولات مورد نیاز خود را به سبد خرید
            اضافه کنید.
          </p>
        </div>
        <div className="text-center mt-4 flex flex-col gap-2">
          <Link href="/">
            <div className="bg-blue-500 text-white p-2 rounded-md no-underline hover:bg-blue-600">
              صفحه اصلی
            </div>
          </Link>
        </div>
      </div>
    );
  }
  if (!value.cart) {
    return <div>در حال پردازش داده های سبد خرید</div>;
  }
  return (
    <div className="h-full px-10 bg-primary">
      <MainCart data={value.cart} />
    </div>
  );
};

export default Main;

Main.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
