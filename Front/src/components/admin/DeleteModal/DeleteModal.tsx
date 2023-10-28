import { Box, Button, Modal, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import React from 'react';

const DeleteModal = ({
  handleOpenDeleteModal,
  handleCloseDeleteModal,
  deleteProduct,
}: any) => {
  return (
    <div>
      <Modal
        open={handleOpenDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="delete-modal-title" variant="h6" component="h2">
            تایید حذف محصول
          </Typography>
          <Typography id="delete-modal-description" sx={{ mt: 2 }}>
            آیا مطمئن هستید که میخواهید این محصول را حذف کنید؟
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2, mr: 2, bgcolor: red[400] }}
            style={{
              background: '#f25f55',
            }}
            onClick={() => {
              deleteProduct();
              handleCloseDeleteModal();
            }}
          >
            تایید
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={handleCloseDeleteModal}
          >
            انصراف
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteModal;
