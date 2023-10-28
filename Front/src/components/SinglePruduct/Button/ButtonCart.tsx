import useRedux from '@/hooks/usRedux';
import { CART, DELETEITEM } from '@/redux/slice/userSlice';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface props {
  quantity: number;
  data: any;
}
const ButtonCart = ({ quantity, data }: props) => {
  const [value, dispatch] = useRedux((state) => state.userState);
  const [addToCart, setAddToCart] = useState(false);
  const [numberOrder, setnumberOrder] = useState(1);

  useEffect(() => {
    if (value.cart.length > 0) {
      const dataLocalFind = value.cart.find(
        (item: any) => item.data._id === data._id
      );
      if (dataLocalFind) {
        setAddToCart(true);
        setnumberOrder(dataLocalFind.quantity);
      }
    }
  }, []);

  const handleLocalCart = (number: number) => {
    setnumberOrder(number);
    dispatch(CART({ quantity: number, data: data }));
  };

  const handleDeleteCart = () => {
    toast.error('حذف با موفقیت انجام شد', { autoClose: 2000 });
    return dispatch(DELETEITEM({ id: data._id }));
  };

  return (
    <div>
      {addToCart ? (
        <div className="flex">
          <button
            type="button"
            className="bg-blue-400 px-1 rounded-r-lg"
            onClick={() => {
              return handleLocalCart(
                numberOrder < quantity ? numberOrder + 1 : numberOrder
              );
            }}
          >
            <Image
              src={'/icons/user/Plus.svg'}
              alt="plus"
              width={20}
              height={10}
            />
          </button>
          <div className="border flex items-center bg-white justify-center px-2  ">
            <span> {numberOrder} </span>
          </div>
          {numberOrder === 1 ? (
            <button
              type="button"
              className="px-1 rounded-l-lg bg-red-400"
              onClick={() => {
                setAddToCart(false);
                return handleDeleteCart();
              }}
            >
              <Image
                src={'/icons/user/Trash.svg'}
                alt="Trash"
                width={20}
                height={10}
              />
            </button>
          ) : (
            <button
              type="button"
              className="px-1 bg-btnCard rounded-l-lg bg-blue-400"
              onClick={() => {
                handleLocalCart(
                  numberOrder > 0 ? numberOrder - 1 : numberOrder
                );
              }}
            >
              <Image
                src={'/icons/user/Minus.svg'}
                alt="minus"
                width={20}
                height={5}
              />
            </button>
          )}
        </div>
      ) : quantity !== 0 ? (
        <button
          type="button"
          className="bg-[#009dae] hover:bg-[#19a8b8] hover:shadow-md text-[12px] p-2 rounded-lg flex items-center justify-center gap-2 px-1"
          onClick={() => {
            setAddToCart(true);
            toast.success('محصول مورد نظر به سبد خرید اضافه شد', {
              autoClose: 2000,
            });
            return handleLocalCart(1);
          }}
        >
          <Image
            src={'/icons/user/BuyCard.svg'}
            alt={'name'}
            width={20}
            height={20}
          />
          <span className="text-white ">افزودن به سبد خرید</span>
        </button>
      ) : (
        <Button
          type="button"
          className="bg-grayLight p-2 rounded-lg flex items-center justify-center gap-5 px-3"
        >
          <Image
            src={'/icons/user/BuyCard.svg'}
            alt={'name'}
            width={20}
            height={20}
          />
          <span className="text-white ">فاقد موجودی</span>
        </Button>
      )}
    </div>
  );
};

export default ButtonCart;
