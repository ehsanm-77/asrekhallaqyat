import React from 'react';
import { Footer, Header } from './components';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-blue-100 flex flex-col justify-between h-full">
      <Header />
      <div>
        <div className="pt-[200px] md:pt-[162px] h-full">{children}</div>
        <Footer />
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
    </main>
  );
};

export default MainLayout;
