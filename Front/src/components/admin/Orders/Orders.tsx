import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import {
  GridColDef,
  DataGrid,
  GridRowId,
  GridCellModesModel,
} from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { CustomPaginationComponent } from '../Pagination/Pagination';
import { useGetOrders } from '@/hooks/useGetOrders';
import {
  changeDelivery,
  changeDeliveryToAll,
  orderSetPage,
} from '@/redux/slice/order.slice';

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

const handleDelete = (orderId: string) => {
  console.log(`Delete order with ID: ${orderId}`);
};

const handleEdit = (orderId: string) => {
  console.log(`Edit order with ID: ${orderId}`);
};

const Orders: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const orderPaginate = useSelector((state: RootState) => state.orderSlice);

  const dispatch = useDispatch();

  const { data, isLoading } = useGetOrders();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Typography component="div">
        <div className="text-xl mb-3 w-full flex justify-center">سفارش ها</div>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">سفارش </InputLabel>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            onChange={(event) => {
              const value = event.target.value as number;
              setSelectedUser(value);

              if (value === 10 || value === 20) {
                dispatch(changeDelivery(value));
              } else {
                dispatch(changeDeliveryToAll());
              }
            }}
          >
            <MenuItem value={0}>همه سفارشات</MenuItem>
            <MenuItem value={20}>تحویل داده شده</MenuItem>
            <MenuItem value={10}>در انتظار ارسال</MenuItem>
          </Select>
        </FormControl>
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
            rows={data?.data?.orders}
            columns={columns}
            paginationMode="server"
            sortingMode="server"
            getRowId={(row) => row._id}
            rowCount={data?.total}
            pageSizeOptions={[5, 10, 20]}
            onPaginationModelChange={(paginationModel) => {
              dispatch(orderSetPage(paginationModel));
            }}
            paginationModel={orderPaginate}
            components={{
              Pagination: CustomPaginationComponent,
            }}
          />
        </div>
      </Typography>
    </>
  );
};
const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'نام کاربر',
    width: 180,
    editable: false,
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'bg-[#0DBDBD] border text-white',
    renderCell: (e) => {
      return (
        <>
          <div>{`${e.row.user.firstname} ${e.row.user.lastname}`}</div>
        </>
      );
    },
  },
  {
    field: 'totalAmount',
    headerName: 'مجموع مبلغ (تومان)',
    type: 'number',
    width: 180,
    editable: false,
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'bg-[#0DBDBD] border text-white',
    renderCell: (e) => {
      return (
        <>
          <div>{e.row.totalPrice}</div>
        </>
      );
    },
  },
  {
    field: '',
    headerName: 'زمان ثبت سفارش',
    type: 'date',
    width: 180,
    editable: true,
    align: 'center',
    headerAlign: 'center',
    renderCell: ({ row }) => {
      return (
        <div>
          {new Date(row.createdAt).toLocaleString('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      );
    },
    headerClassName: '!bg-[#0DBDBD] border text-white',
  },
  {
    field: 'actions',
    headerName: 'فعالیت',
    width: 180,
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'bg-[#0DBDBD] border text-white',
    renderCell: (params: any) => (
      <div className="">
        <div>
          {params.row.deliveryStatus ? (
            <div className="bg-blue-400 p-2 rounded-md text-white cursor-pointer">
              در انتظار ارسال
            </div>
          ) : (
            <div className="bg-green-400 p-2 rounded-md text-white cursor-pointer">
              تحویل داده شده
            </div>
          )}
        </div>
      </div>
    ),
  },
];
export default Orders;

// isCellEditable={(params) =>
//   params.field !== 'createdAt' &&
//   params.field !== 'userName' &&
//   params.field !== 'totalAmount'
// }
// onEditCellChangeCommitted={({ id, field, props }) => {
//   console.log(`Cell ID: ${id}, Field: ${field}, Props: ${props}`);
// }}
// onEditCellPropsChange={({ id, field, props }) => {
//   console.log(`Cell ID: ${id}, Field: ${field}, Props: ${props}`);
// }}
// onCellClick={(params, event) => {
//   console.log(params);
// }}
// onRowClick={(params, event) => {
//   console.log(params);
// }}

// function EditToolbar(props: EditToolbarProps) {
//   const { selectedCellParams, cellMode, cellModesModel, setCellModesModel } =
//     props;

// const handleSaveOrEdit = () => {
//   if (!selectedCellParams) {
//     return;
//   }
//   const { id, field } = selectedCellParams;
//   const newMode =
//     cellMode === 'ویرایش' ? GridCellModes.View : GridCellModes.Edit;
//   setCellModesModel({
//     ...cellModesModel,
//     [id]: { ...cellModesModel[id], [field]: { mode: newMode } },
//   });
// };

// const handleCancel = () => {
//   if (!selectedCellParams) {
//     return;
//   }
//   const { id, field } = selectedCellParams;
//   setCellModesModel({
//     ...cellModesModel,
//     [id]: {
//       ...cellModesModel[id],
//       [field]: { mode: GridCellModes.View, ignoreModifications: true },
//     },
//   });
// };

// const handleMouseDown = (event: React.MouseEvent) => {
//   event.preventDefault();
// };

//   return (
//     <Box
//       sx={{
//         borderBottom: 1,
//         borderColor: 'divider',
//         p: 1,
//       }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'end',
//           p: 1,
//           gap: '5px',
//         }}
//       >
//         <Button
//           onClick={handleSaveOrEdit}
//           onMouseDown={handleMouseDown}
//           disabled={!selectedCellParams}
//           variant="outlined"
//         >
//           {cellMode === 'ویرایش' ? 'ذخیره' : 'ویرایش'}
//         </Button>
//         <Button
//           onClick={handleCancel}
//           onMouseDown={handleMouseDown}
//           disabled={cellMode === 'view'}
//           variant="outlined"
//           sx={{ ml: 1 }}
//         >
//           انصراف
//         </Button>
//       </Box>
//     </Box>
//   );
// }

// const renderImageCell = (params: any) => {
//   return (
//     <Box sx={{ position: 'relative', width: '50px', height: '65px' }}>
//       <img
//         src={`http://${params.value[0]}`}
//         alt="Product"
//         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//       />
//     </Box>
//   );
// };
