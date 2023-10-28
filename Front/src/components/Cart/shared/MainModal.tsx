import { Dispatch, ReactNode, SetStateAction, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@mui/material';
interface ModalProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<any>>;
  children: ReactNode;
}

const MainModal = ({ openModal, setOpenModal, children }: ModalProps) => {
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <Transition appear show={openModal} as={Fragment}>
  <Dialog open={openModal} onClose={handleClose} className="fixed inset-0 z-50 flex items-center justify-center">
    <Dialog.Panel className="bg-gray-50 max-w-3xl mx-auto rounded-lg shadow-lg border p-4">
      <div className="flex justify-end">
        <button
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full"
          type="button"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="p-4">{children}</div>
    </Dialog.Panel>
  </Dialog>
</Transition>

  );
};

export default MainModal;
