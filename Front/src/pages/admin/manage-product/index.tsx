import React, { useMemo, useState } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import {
  handleSortingProducts,
  productSetPage,
} from '@/redux/slice/product.slice';
import useGetProducts from '@/hooks/useGetProducts';
import axios from 'axios';
import { CustomPaginationComponent } from '@/components/admin/Pagination/Pagination';
import MyModal from '@/components/admin/AddProductModal/AddProductModal';
import EditProductDownDrawer from '@/components/admin/EditProductDownDrawer';
import AdminLayout from '@/layout/adminLayout/AdminLayout';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import DeleteModal from '@/components/admin/DeleteModal/DeleteModal';
import { toast } from 'react-toastify';
import Loading from '@/components/Loading/Loading';

const renderImageCell = (params: any) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '50px',
        height: '65px',
      }}
    >
      <img
        src={`http://${params.value[0]}`}
        alt="Product"
        fill
        style={{
          width: '90%',
          height: '90%',
          objectFit: 'cover',
          borderRadius: '10px',
          // padding:'2px'
        }}
        className="shadow-2xl"
      />
    </Box>
  );
};

const handleDelete = async (productId: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/products/${productId}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default function ManageProduct() {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [id, setId] = useState(null);
  const orderPaginate = useSelector((state: RootState) => state.productSlice);
  const { field, sort } = orderPaginate;
  const { data, isLoading, refetch } = useGetProducts();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => handleDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GetProduct'] });
      toast.success('حذف با موفقیت انجام شد', { autoClose: 2000 });
    },
  });

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    refetch();
    setOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const deleteProduct = () => {
    mutation.mutate(id);
  };

  const handleDeleteItem = (productId) => {
    setId(productId);
  };

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'images',
        headerName: 'تصویر',
        width: 180,
        editable: false,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'bg-[#0DBDBD] border text-white',
        renderCell: renderImageCell,
      },
      {
        field: 'name',
        headerName: 'نام محصول',
        width: 180,
        editable: false,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'bg-[#0DBDBD] border text-white',
      },
      {
        field: 'category',
        headerName: 'دسته بندی',
        width: 180,
        editable: false,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'bg-[#0DBDBD] border text-white',
        renderCell: (params: any) => {
          return <div>{params.value.name}</div>;
        },
      },
      {
        field: 'price',
        headerName: 'قیمت',
        type: 'number',
        editable: false,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'bg-[#0DBDBD] border text-white',
      },
      {
        field: 'actions',
        headerName: 'فعالیت',
        width: 180,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'bg-[#0DBDBD] border text-white',
        renderCell: (params: any) => (
          <>
            <div className="flex">
              <EditProductDownDrawer productInfo={params.row} />
              <div
                onClick={() => {
                  handleDeleteItem(params.row._id);
                  handleOpenDeleteModal();
                }}
              >
                <img
                  src="/assets/img/manager/x-round-svgrepo-com.svg"
                  alt=""
                  className="w-10 cursor-pointer"
                />
              </div>
            </div>
          </>
        ),
      },
    ],
    []
  );

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Typography component="div">
        <Button
          style={{
            backgroundColor: '#009DAE',
            color: 'white',
            // width: '100%',
            marginRight: 'auto',
            borderRadius: '20px',
            fontSize: '20px',
          }}
          onClick={handleOpenModal} // Add this line
        >
          افزودن کالا
        </Button>
        <div
          className="shadow-md rounded-lg sm:w-[550px] w-[340px] md:w-full h-[400px] md:h-[420px]"
          // style={{ height: 500 }}
        >
          <DataGrid
            sx={{
              '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                outline: 'none !important',
              },
            }}
            rowHeight={61}
            rows={data.data.products}
            // loading={isLoading}
            columns={columns}
            paginationMode="server"
            sortingMode="server"
            onSortModelChange={(i) => dispatch(handleSortingProducts(i))}
            sortModel={[{ field, sort }]}
            getRowId={(row) => row._id}
            rowCount={data.total}
            pageSizeOptions={[5, 10, 20]}
            onPaginationModelChange={(w) => dispatch(productSetPage(w))}
            paginationModel={orderPaginate}
            components={{
              Pagination: CustomPaginationComponent,
            }}
          />
        </div>
        {open && <MyModal handleCloseModal={handleCloseModal} open={open} />}
        {openDeleteModal && (
          <DeleteModal
            handleCloseDeleteModal={handleCloseDeleteModal}
            handleOpenDeleteModal={handleOpenDeleteModal}
            deleteProduct={deleteProduct}
          />
        )}
      </Typography>
    </>
  );
}

ManageProduct.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
