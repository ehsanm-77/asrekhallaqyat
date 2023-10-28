import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import AdminLayout from '@/layout/adminLayout/AdminLayout';
import SaveButton from '@/components/admin/Inventory/SaveButton';
import InventoryTable from '@/components/admin/Inventory/InventoryTable';

const Inventory: NextPageWithLayout = () => {
  const [editedProduct, setEditedProduct] = React.useState<EditedProduct[]>([]);
  return (
    <>
      <Typography component="div">
        <SaveButton editedProduct={editedProduct} />
        <InventoryTable setEditedProduct={setEditedProduct} />
      </Typography>
    </>
  );
};

Inventory.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Inventory;
