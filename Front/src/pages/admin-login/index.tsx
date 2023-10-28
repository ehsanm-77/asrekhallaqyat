import AdminForm from '@/components/admin-login/AdminForm/AdminForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-login-bg bg-no-repeat bg-cover bg-center">
      <div className="w-full flex flex-col justify-between max-w-md p-6 bg-white rounded-lg shadow-md ">
        <AdminForm />
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          theme="colored"
        />
      </div>
    </div>
  );
};

export default LoginPage;
