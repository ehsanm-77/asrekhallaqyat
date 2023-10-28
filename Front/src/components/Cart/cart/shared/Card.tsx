import Image from 'next/image';
import ButtonCart from '../mainCart/cards/ButtonCart';
interface props {
  quantity: number;
  data: any;
}
const EachCard = ({ data, quantity }: props) => {
  return (
    <div className=" w-full flex md:justify-between shadow-md md:flex-row flex-col gap-2 rounded-xl p-3 bg-white">
      <div className="flex flex-col items-center justify-center sm:justify-start gap-2 md:w-10/12 sm:flex-row ">
        <Image
          src={`http://${data.images[0]}`}
          alt=""
          className="rounded-xl"
          width={100}
          height={100}
        />

        <div className="">
          <div className="flex gap-3 flex-col items-start  w-full">
            <div className="">
              <p className="break-words text-center sm:text-right">
                {data.name}
              </p>
            </div>
            <div className=" flex w-full gap-5 justify-start flex-col items-center  sm:flex-row">
              <div className="flex items-center justify-start  text-sm text-grayDarkLight gap-1">
                <span>موجود در انبار :</span> <span> {data.quantity}</span>
              </div>
              <div className="flex items-center justify-start  text-sm text-grayDarkLight gap-1">
                <span>قیمت کالا :</span>{' '}
                <span> {Intl.NumberFormat('fa-IR').format(data.price)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <ButtonCart quantity={quantity} data={data} />
      </div>
    </div>
  );
};

export default EachCard;
