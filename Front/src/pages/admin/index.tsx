import AdminLayout from '@/layout/adminLayout/AdminLayout';

const AdminHome = () => {
  return (
    <div className="bg-primary flex flex-col justify-center items-center">
      <img src="/assets/img/header/logo.png" alt="" className="w-1/2 h-auto" />
    </div>
  );
};

export default AdminHome;
AdminHome.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
