import useRedux from '@/hooks/usRedux';
import { TOTAL } from '@/redux/slice/userSlice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface props {
  data: { data: any; quantity: number }[];
}
const Index = ({ data }: props) => {
  const [value, dispatch] = useRedux((state) => state.userState);
  const router = useRouter();
  const [sumPrice, setSumPrice] = useState(0);
  const [total, setTotal] = useState(0);

  const userId = JSON.parse(localStorage.getItem('userInfo'));

  const handleBuy = () => {
    if (userId === null) {
      setTimeout(() => {
        router.push('/admin-login');
      }, 2000);
      toast.warn('لطفا ابتدا وارد شوید', {
        autoClose: 2000,
      });
    } else {
      router.push('/cart/checkout');
    }
  };

  useEffect(() => {
    const TotalData = data.reduce((total, item) => {
      const price = +item.data.price * item.quantity;
      return total + price;
    }, 0);
    setSumPrice(TotalData);
    setTotal(TotalData);
    dispatch(TOTAL(TotalData));
  }, [data]);

  return (
    <div className=" lg:w-4/12 rounded-xl w-full bg-white h-fit shadow-md">
      <p className="bg-[#009dae] rounded-t-xl p-3 text-white flex justify-center">
        اطلاعات پرداخت
      </p>
      <div className="w-full  border-opacity-20 rounded-md flex flex-col gap-5  p-3">
        <div className="flex items-center justify-between text-sm">
          <div>
            <span>مبلغ کالا ها</span>
            <span className="bg-btnCard text-white rounded-lg w-1 h-1"></span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <span className="text-sm">
              {Intl.NumberFormat('fa-IR').format(sumPrice)}
            </span>
            <span>تومان</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-btnCard">تخفیف</span>
          </div>
          <div className="text-btnCard flex items-center justify-center gap-1">
            <span className="text-sm">
              -{/* {Intl.NumberFormat('fa-IR').format(discount.percent)} */}
            </span>
            <span>تومان</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="">هزینه ارسال</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <span className="text-sm">
              -{/* {Intl.NumberFormat('fa-IR').format(cost)} */}
            </span>
            <span>تومان</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="">مبلغ قابل پرداخت</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <span className="text-sm">
              {Intl.NumberFormat('fa-IR').format(total)}
            </span>
            <span>تومان</span>
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center justify-center text-sm gap-3">
            <button
              type="submit"
              className="bg-blue-600 px-5 rounded-lg py-3 text-white hover:bg-btnCard focus:ring-btnCard outline-none "
            >
              اعمال
            </button>
            <input
              name="discount"
              type="text"
              className="py-3 border focus:outline-none w-full rounded-md px-2"
              placeholder="کد تخفیف را وارد کنید"
            />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center text-sm">
          <button
            type="button"
            className="bg-[#1ecab6] w-full text-white rounded-xl py-2"
            onClick={handleBuy}
          >
            ادامه خرید
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;

// Discount =>

// const [discount, setDiscount] = useState({
//   usediscount: false,
//   percent: 0,
//   value: '',
// });

// const handleDiscount = (event) => {
//   event.preventDefault();

//   let discountPercentage = 0; // Default discount percentage is 0 (no discount applied)
//   if (discount.usediscount === false) {
//     if (discount.value === 'طلایی') {
//       discountPercentage = 30;
//       discount.percent = (sumPrice * discountPercentage) / 100;
//       setDiscount(discount);
//     } else if (discount.value === 'نقره ای') {
//       discountPercentage = 20;
//       discount.percent = (sumPrice * discountPercentage) / 100;
//       setDiscount(discount);
//     } else if (discount.value === 'برنزی') {
//       discountPercentage = 10;
//       discount.percent = (sumPrice * discountPercentage) / 100;
//       setDiscount(discount);
//     }

//     const discountAmount = (total * discountPercentage) / 100;
//     const discountedTotal = total - discountAmount;
//     setTotal(discountedTotal);
//     dispatch(TOTAL(discountedTotal));
//     discount.usediscount = true;
//     discount.value = '';
//     setDiscount(discount);
//   } else {
//     // toast.warn("کاربر عزیز شما کد تخفیف دیگری استفاده کردید.")
//   }
// };
