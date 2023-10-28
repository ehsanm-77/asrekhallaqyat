import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  GridColDef,
  DataGrid,
  GridRowId,
  GridCellModes,
  GridCellModesModel,
} from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import {
  handleSortingProducts,
  productSetPage,
} from '@/redux/slice/product.slice';
import useGetProducts from '@/hooks/useGetProducts';
import { CustomPaginationComponent } from '../Pagination/Pagination';
import Image from 'next/image';
import MyModal from '../AddProductModal/AddProductModal';
import { useMutation } from '@tanstack/react-query';
import EditProductDownDrawer from '../EditProductDownDrawer';
import axios from 'axios';

interface SelectedCellParams {
  id: GridRowId;
  field: string;
}

interface EditToolbarProps {
  selectedCellParams?: SelectedCellParams;
  cellModesModel: GridCellModesModel;
  setCellModesModel: (value: GridCellModesModel) => void;
  cellMode: 'view' | 'ویرایش';
}

function EditToolbar(props: EditToolbarProps) {
  const { selectedCellParams, cellMode, cellModesModel, setCellModesModel } =
    props;

  const handleSaveOrEdit = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    const newMode =
      cellMode === 'ویرایش' ? GridCellModes.View : GridCellModes.Edit;
    setCellModesModel({
      ...cellModesModel,
      [id]: { ...cellModesModel[id], [field]: { mode: newMode } },
    });
  };

  const handleCancel = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    setCellModesModel({
      ...cellModesModel,
      [id]: {
        ...cellModesModel[id],
        [field]: { mode: GridCellModes.View, ignoreModifications: true },
      },
    });
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        p: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          p: 1,
          gap: '5px',
        }}
      >
        <Button
          onClick={handleSaveOrEdit}
          onMouseDown={handleMouseDown}
          disabled={!selectedCellParams}
          variant="outlined"
        >
          {cellMode === 'ویرایش' ? 'ذخیره' : 'ویرایش'}
        </Button>
        <Button
          onClick={handleCancel}
          onMouseDown={handleMouseDown}
          disabled={cellMode === 'view'}
          variant="outlined"
          sx={{ ml: 1 }}
        >
          انصراف
        </Button>
      </Box>
    </Box>
  );
}
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
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '5px',
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
  const [isEdit, setIsEdit] = useState(false);
  const orderPaginate = useSelector((state: RootState) => state.productSlice);
  const { field, sort } = orderPaginate;
  const { data, isLoading, refetch } = useGetProducts();

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    refetch();
    setOpen(false);
  };

  if (isLoading) {
    return;
  }

  return (
    <>
      <Typography component="div">
        <div className="text-xl mb-3 w-full flex justify-center text-blue-900">
          ... محصولات ...
        </div>
        <Button
          style={{
            backgroundColor: '#009DAE',
            color: 'white',
            width: '100%',
            marginRight: 'auto',
            borderRadius: '2rem 2rem 0 0',
            fontSize: '20px',
          }}
          onClick={handleOpenModal} // Add this line
        >
          افزودن کالا
        </Button>
        <div
          className="shadow-md rounded-lg"
          style={{ height: 500, width: '100%' }}
        >
          <DataGrid
            sx={{
              '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                outline: 'none !important',
              },
            }}
            rowHeight={77}
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
      </Typography>
    </>
  );
}
const columns: GridColDef[] = [
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
    editable: true,
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'bg-[#0DBDBD] border text-white',
  },
  {
    field: 'category',
    headerName: 'دسته بندی',
    width: 180,
    editable: true,
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
    editable: true,
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
          <div onClick={() => handleDelete(params.id)}>
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
];
