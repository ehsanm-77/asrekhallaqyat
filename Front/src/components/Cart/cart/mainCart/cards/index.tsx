import React from 'react';
import ButtonCart from './ButtonCart';
import EachCard from '../../shared/Card';
interface props {
  data: { data: any; quantity: number }[];
}
const index = ({ data }: props) => {
  return (
    <div className="flex-1 flex flex-col gap-3 shadow-md rounded-xl bg-white mt-8 md:mt-0">
      <div className="bg-[#009dae] p-3 flex justify-center text-white rounded-t-xl">
        سبد خرید
      </div>
      <div className="flex flex-col gap-3 h-[415px] overflow-y-scroll p-3">
        {data?.map((item) => (
          <EachCard
            quantity={item.quantity}
            key={item.data._id}
            data={item.data}
          />
        ))}
      </div>
    </div>
  );
};

export default index;
