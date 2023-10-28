import getData from '@/api/getData';
import useRedux from '@/hooks/useRedux';
import { MainCart } from '@/page/user';
import Image from 'next/image';

const Main = () => {
  const [value, dispatch] = useRedux((state) => state.userState);
  if (value.cart.length <= 0) {
    return (
      <div className="flex py-20 items-center justify-center] flex-col gap-2">
        <Image
          src={'/icons/user/emptyShop.svg'}
          alt="سبد خرید"
          width={300}
          height={200}
        />{' '}
        <div>سبد خرید شما خالی می باشد</div>
      </div>
    );
  }
  if (!value.cart) {
    return <div>در حال پردازش داده های سبد خرید</div>;
  }
  return (
    <div className="xl:container xl:mx-auto px-4 ">
      <MainCart data={value.cart} />{' '}
    </div>
  );
};

export default Main;

Main.getLayout = function PageLayout(page: any) {
  return <>{page}</>;
};
