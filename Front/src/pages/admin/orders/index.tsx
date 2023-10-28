import React, { useMemo, useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Dialog,
  DialogContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
} from '@mui/material';
import {
  GridColDef,
  DataGrid,
  GridRowId,
  GridCellModesModel,
} from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { useGetOrders } from '@/hooks/useGetOrders';
import {
  changeDelivery,
  changeDeliveryToAll,
  orderSetPage,
} from '@/redux/slice/order.slice';
import { CustomPaginationComponent } from '@/components/admin/Pagination/Pagination';
import AdminLayout from '@/layout/adminLayout/AdminLayout';
import { request } from '@/api/instance/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Loading from '@/components/Loading/Loading';

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

const Orders = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedOrderId, setSelectedOrderId] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelivery, setOpenModalDelivery] = useState(false);

  const orderPaginate = useSelector((state: RootState) => state.orderSlice);
  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const { data, isLoading } = useGetOrders();

  const mutation = useMutation({
    mutationFn: async ({ id, obj }) =>
      await request.patch(`/orders/${id}`, obj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('تغییر وضعیت با موفقیت انجام شد', { autoClose: 2000 });
    },
  });

  const columns: GridColDef[] = useMemo(
    () => [
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
              <div>{`${e.row?.user?.firstname} ${e.row?.user?.lastname}`}</div>
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
                <div
                  onClick={() => {
                    setSelectedOrderId(params.row);
                    setOpenModalDelivery(true);
                  }}
                  className="bg-green-400 p-2 rounded-md text-white cursor-pointer"
                >
                  تحویل داده شده
                </div>
              ) : (
                <div
                  className="bg-blue-400 p-2 rounded-md text-white cursor-pointer"
                  onClick={() => {
                    setSelectedOrderId(params.row);
                    setOpenModal(true);
                  }}
                >
                  در انتظار ارسال
                </div>
              )}
            </div>
          </div>
        ),
      },
    ],
    []
  );

  const handleChangeDelivery = () => {
    const obj = {
      deliveryStatus: true,
      products: selectedOrderId?.products?.map((item) => {
        return {
          count: item.count,
          product: item?.product?._id,
        };
      }),
    };
    mutation.mutate({ id: selectedOrderId._id, obj: obj });
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const handleOptionClick = (event) => {
    const value = event.target.value as number;
    setSelectedUser(value);

    if (value === 10 || value === 20) {
      dispatch(changeDelivery(value));
    } else {
      dispatch(changeDeliveryToAll());
    }
  };

  return (
    <>
      <Typography component="div">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">سفارش</InputLabel>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            onChange={handleOptionClick}
            sx={{
              borderRadius: '2rem 2rem 0 0',
              backgroundColor: '#009DAE',
              color: 'white',
            }}
          >
            <MenuItem value={0}>همه سفارشات</MenuItem>
            <MenuItem value={20}>تحویل داده شده</MenuItem>
            <MenuItem value={10}>در انتظار ارسال</MenuItem>
          </Select>
        </FormControl>
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

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogContent>
          {selectedOrderId && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '40px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '10px',
                  }}
                >
                  <Box
                    sx={{
                      // width: '40%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <div className="border rounded-lg h-[55px] p-3 flex items-center bg-blue-100">
                      <span>نام : </span>
                      <span>{selectedOrderId.user?.firstname}</span>
                    </div>
                    <div className="border rounded-lg h-[55px] p-3 bg-blue-100">
                      <span>نام خانوادگی : </span>
                      <span> {selectedOrderId.user?.lastname}</span>
                    </div>
                  </Box>
                  <Box
                    sx={{
                      // width: '60%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <div className="border rounded-lg text-center h-[55px] p-3 flex items-center bg-blue-100">
                      شماره موبایل : {selectedOrderId.user?.phoneNumber}
                    </div>
                    <div className="border rounded-lg text-center h-[55px] p-3 flex items-center bg-blue-100">
                      تاریخ تحویل :
                      {new Date(selectedOrderId.deliveryDate).toLocaleString(
                        'fa-IR',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </div>
                  </Box>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          نام محصول
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          تعداد
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedOrderId.products?.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            {product && product?.product?.name}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            {product.count}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              <Button
                onClick={() => {
                  handleChangeDelivery();
                  setOpenModal(false);
                }}
                style={{
                  backgroundColor: '#5597e0',
                  color: 'white',
                  marginTop: '10px',
                  width: '100%',
                }}
              >
                تغییر وضعیت
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={openModalDelivery}
        onClose={() => setOpenModalDelivery(false)}
      >
        <DialogContent>
          {selectedOrderId && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '40px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '10px',
                  }}
                >
                  <Box
                    sx={{
                      // width: '40%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <div className="border rounded-lg h-[55px] p-3 flex items-center bg-blue-100">
                      <span>نام : </span>
                      <span>{selectedOrderId.user?.firstname}</span>
                    </div>
                    <div className="border rounded-lg h-[55px] p-3 bg-blue-100">
                      <span>نام خانوادگی : </span>
                      <span> {selectedOrderId.user?.lastname}</span>
                    </div>
                  </Box>
                  <Box
                    sx={{
                      // width: '60%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <div className="border rounded-lg text-center h-[55px] p-3 flex items-center bg-blue-100">
                      شماره موبایل : {selectedOrderId.user?.phoneNumber}
                    </div>
                    <div className="border rounded-lg text-center h-[55px] p-3 flex items-center bg-blue-100">
                      تاریخ تحویل :
                      {new Date(selectedOrderId.deliveryDate).toLocaleString(
                        'fa-IR',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </div>
                  </Box>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          نام محصول
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          تعداد
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedOrderId.products?.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            {product && product?.product?.name}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            {product.count}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              <Box
                style={{
                  backgroundColor: '#999a9d',
                  color: 'white',
                  marginTop: '10px',
                  width: '100%',
                  padding: '6px',
                  borderRadius: '5px',
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                تحویل داده شده
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Orders;

Orders.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
