import { Box, Button, Drawer } from '@mui/material';
import React, { useState } from 'react';
import EditProductForm from '../EditProductForm';

function EditProductDownDrawer({ productInfo }: { productInfo: any }) {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Box>
        <div onClick={() => setOpen(true)}>
          <img
            src="/assets/img/manager/edit-round-svgrepo-com.svg"
            alt=""
            className="w-10 cursor-pointer"
          />
        </div>
      </Box>
      <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: 'flex',
            gap: '15px',
            flexDirection: 'column',
            marginTop: '10px',
            paddingX: '12px',
            maxHeight: '750px',
          }}
        >
          <EditProductForm productInfo={productInfo} setOpen={setOpen} />
        </Box>
      </Drawer>
    </Box>
  );
}

export default EditProductDownDrawer;
