import React from 'react';
import Header from './components/Header/Header';
import Drrawer from './components/Drawer/Drawer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-24 h-full bg-primary">
      <Header />
      <div className="flex justify-center items-center h-full mb-20">
        <Drrawer />
        {children}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        theme="colored"
      />
    </div>
  );
};

export default AdminLayout;
