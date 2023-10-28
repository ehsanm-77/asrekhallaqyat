import postData from '@/api/postData';
import { Button } from '@/components';
import Linkrouter from '@/components/Linkrouter';
import useRedux from '@/hooks/useRedux';
import { CLEARALL } from '@/redux/slice/user/userSlice';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';

const Index = () => {
  const [value, dispatch] = useRedux((state) => state.userState);
  const router = useRouter();
  const HandleAddOrder = async () => {
    return await postData('/orders', value.FinalOrders);
  };
  const mutation = useMutation(HandleAddOrder, {
    onSuccess(data, variables, context) {
      router.push('/cart/payment/success');
      return dispatch(CLEARALL({}));
    },
    onError(error, variables, context) {
      return router.push('/cart/payment/fail');
    },
  });
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-3">
      <div className="">
        <span>مبغ نهایی :</span>
        <span>{Intl.NumberFormat('fa-IR').format(value.Total)} تومان</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        {/* <Linkrouter href="/cart/payment/success"> */}
        <Button
          type="button"
          className="bg-btnCard p-2 rounded-md text-white"
          onClick={() => {
            return mutation.mutate();
          }}
        >
          پرداخت
        </Button>
        {/* </Linkrouter> */}

        <Linkrouter href="/cart">
          <Button type="button" className="bg-zinc-300 p-2 rounded-md ">
            انصراف
          </Button>
        </Linkrouter>
      </div>
    </div>
  );
};

export default Index;
