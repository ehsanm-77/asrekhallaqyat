import { Button } from '@/components';
import Linkrouter from '@/components/Linkrouter';
import Image from 'next/image';

interface props {
  href: string;
  srcImg: string;
  name: string;
  desc: string | undefined;
  price: number;
  id: string;
}
function Card({ href, srcImg, name, desc, price, id }: props) {
  return (
    <div className="bg-white rounded-xl w-64 pt-10 s-full shadow-md">
    <div className="flex items-center justify-center flex-col gap-7">
      <div className="flex items-center justify-center px-5 w-full">
        <Linkrouter href={`/products/${id}`}>
          <Image
            src={`http://localhost:8000/images/products/images/${srcImg}`}
            alt={name}
            width={150}
            height={150}
            className="rounded-xl"
          />
        </Linkrouter>
      </div>
      <div className="px-5 py-2 w-full gap-7 flex flex-col items-center justify-center">
        <div className="w-full">
          <div className=" break-words h-20">
            <Linkrouter href={`/products/${id}`} className="w-full ">
              {name.substring(0, 100)}
            </Linkrouter>
          </div>
        </div>
        <div className="flex w-full justify-between items-center">
          <Button type="button" className="bg-btnCard p-2 rounded-lg">
            <Linkrouter href={`/products/${id}`}>
              <Image
                src={'/icons/user/BuyCard.svg'}
                alt={name}
                width={20}
                height={20}
              />
            </Linkrouter>
          </Button>
          <div className="flex items-center gap-1 justify-between">
            <span className="text-sm">
              {Intl.NumberFormat('fa-IR').format(price)}
            </span>
            <span className="text-sm">تومان</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Card;
