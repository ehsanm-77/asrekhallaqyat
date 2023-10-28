import { GridPagination } from '@mui/x-data-grid';

export const CustomPaginationComponent = (props: any) => {
  const { paginationProps } = props;

  return (
    <GridPagination
      {...paginationProps}
      labelRowsPerPage="ردیف به ازای صفحه"
      rowsPerPageOptions={[5, 10, 20]}
      className="pagination-rtl"
    />
  );
};
