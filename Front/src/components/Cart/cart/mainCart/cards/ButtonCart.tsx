import Image from 'next/image';
import { useState } from 'react';
import DeleteCart from './DeleteCart';
import useRedux from '@/hooks/usRedux';
import { CART } from '@/redux/slice/userSlice';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
interface props {
  quantity: number;
  data: any;
}
const ButtonCart = ({ quantity, data }: props) => {
  const [openModal, setOpenModal] = useState(false);
  const [value, dispatch] = useRedux((state) => state.userState);
  const [numberOrder, setnumberOrder] = useState(quantity);

  const handleLocalCart = (number: number) => {
    if (number === data.quantity) {
      toast.warn(`حداکثر موجودی این کالا ${data.quantity} عدد می باشد.`);
    }
    setnumberOrder(number);

    dispatch(CART({ quantity: number, data: data }));
  };

  return (
    <div className="relative">
      <div
        className="absolute md:bottom-[52px] md:right-[85px] right-[100px] h-5 w-5 bg-red-400 text-white rounded-full flex justify-center cursor-pointer"
        onClick={() => {
          return setOpenModal(true);
        }}
      >
        ✖
      </div>
      {openModal ? (
        <DeleteCart
          openModal={openModal}
          setOpenModal={setOpenModal}
          name={data.name}
          id={data._id}
        />
      ) : (
        ''
      )}
      <div className="flex">
        <button
          type="button"
          className="bg-blue-400 px-1 bg-btnCard rounded-r-lg"
          onClick={() => {
            handleLocalCart(
              numberOrder < data.quantity ? numberOrder + 1 : numberOrder
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
        <div className="border flex items-center justify-center w-10">
          <span> {numberOrder} </span>
        </div>
        {numberOrder === 1 ? (
          <button
            type="button"
            className="bg-red-400 px-1 bg-btnCard rounded-l-lg"
            onClick={() => {
              return setOpenModal(true);
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
            className="px-1 bg-blue-400 rounded-l-lg"
            onClick={() => {
              handleLocalCart(numberOrder > 0 ? numberOrder - 1 : numberOrder);
            }}
          >
            <Image
              src={'/icons/user/Minus.svg'}
              alt="minus"
              width={20}
              height={10}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default ButtonCart;
