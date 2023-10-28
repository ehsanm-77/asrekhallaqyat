import { FinalForm } from '@/components/Cart/cart';
import MainLayout from '@/layout/mainLayout';
import { useRouter } from 'next/router';
interface props {
  user: any;
}
const final = () => {
  const userId = JSON.parse(localStorage.getItem('userInfo'));
  return (
    <div className="bg-primary flex justify-center items-center h-full p-10">
      <FinalForm userData={userId} />
    </div>
  );
};

export default final;

final.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
