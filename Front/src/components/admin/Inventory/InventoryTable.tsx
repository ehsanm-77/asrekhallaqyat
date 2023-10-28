import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import {
  handleSortingProducts,
  productSetPage,
} from '@/redux/slice/product.slice';
import useGetProducts from '@/hooks/useGetProducts';
import { CustomPaginationComponent } from '@/components/admin/Pagination/Pagination';
import Loading from '@/components/Loading/Loading';

const InventoryTable = ({
  setEditedProduct,
}: {
  setEditedProduct: (value: (val: EditedProduct[]) => EditedProduct[]) => void;
}) => {
  const orderPaginate = useSelector((state: RootState) => state.productSlice);
  const { field, sort } = orderPaginate;
  const dispatch = useDispatch();

  const { data, isLoading } = useGetProducts();

  if (isLoading) {
    return <Loading />;
  }

  return (
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
        processRowUpdate={(updatedRow) =>
          setEditedProduct((prev) => [...prev, updatedRow])
        }
      />
    </div>
  );
};
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
    field: 'brand',
    headerName: 'نشر',
    type: 'number',
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
    field: 'quantity',
    headerName: 'موجودی',
    type: 'number',
    editable: true,
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'bg-[#0DBDBD] border text-white',
  },
];

export default InventoryTable;
