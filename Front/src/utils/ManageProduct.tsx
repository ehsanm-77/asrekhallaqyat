import React from 'react';
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

export default function ManageProduct() {
  const orderPaginate = useSelector((state: RootState) => state.productSlice);
  const { field, sort } = orderPaginate;
  const dispatch = useDispatch();

  const { data, isLoading } = useGetProducts();

  if (isLoading) {
    return;
  }

  return (
    <>
      <Typography component="div">
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
      </Typography>
    </>
  );
}

const columns: GridColDef[] = [
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
    field: 'price',
    headerName: 'قیمت',
    type: 'number',
    editable: true,
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'bg-[#0DBDBD] border text-white',
  },
  {
    field: 'dateCreated',
    headerName: 'تاریخ ایجاد',
    type: 'date',
    width: 180,
    editable: true,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (params) => new Date(params.value),
    headerClassName: 'bg-[#0DBDBD] border text-white',
  },
  {
    field: 'lastLogin',
    headerName: 'آخرین ورود',
    type: 'dateTime',
    width: 220,
    editable: true,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (params) => new Date(params.value),
    headerClassName: 'bg-[#0DBDBD] border text-white',
  },
];
