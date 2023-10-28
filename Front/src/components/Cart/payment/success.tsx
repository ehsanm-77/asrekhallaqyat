import Linkrouter from '@/components/Linkrouter';

const Success = () => {
  return (
    <div className='flex items-center justify-center w-full h-full flex-col gap-2'>
      <div>پرداخت شما با موفقیت ثبت شد </div>
      <div>با تشکر از خرید شما🤍</div>
      <Linkrouter className="text-btnCard" href="/">
        برگشت به صفحه اول سایت
      </Linkrouter>
    </div>
  );
};

export default Success;
