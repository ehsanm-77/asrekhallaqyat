import MainModal from '@/components/Cart/shared/MainModal';
import useRedux from '@/hooks/usRedux';
import { DELETEITEM } from '@/redux/slice/userSlice';
import { Button } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

interface props {
  id: string;
  name: string;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<any>>;
}
const DeleteCart = ({ id, openModal, setOpenModal, name }: props) => {
  const [value, dispatch] = useRedux((state) => state.userState);

  const handleDeleteCart = () => {
    dispatch(DELETEITEM({ id: id }));
    toast.success(`محصول مورد نظر با موفقیت حذف شد`);
    setOpenModal(false);
  };
  return (
    <div>
      <MainModal openModal={openModal} setOpenModal={setOpenModal}>
      <div className="py-10 gap-5 flex items-center justify-center flex-col">
  <p className="text-center">
    {`آیا از حذف ${name} اطمینان دارید؟`}
  </p>
  <div className="flex gap-4">
    <button
      className="bg-blue-400 px-3 py-2 w-16 rounded-md text-white hover:bg-blue-700"
      type="button"
      onClick={handleDeleteCart}
    >
      بله
    </button>
    <button
      className="bg-gray-500 px-3 py-2 w-16 rounded-md text-white hover:bg-gray-400"
      type="button"
      onClick={() => setOpenModal(false)}
    >
      خیر
    </button>
  </div>
</div>

      </MainModal>
    </div>
  );
};

export default DeleteCart;
