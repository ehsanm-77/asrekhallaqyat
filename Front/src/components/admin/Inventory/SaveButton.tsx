import React from 'react';
import Button from '@mui/material/Button';
import useParallelEditProduct from '@/api/useParallelEditProduct';

const SaveButton = ({ editedProduct }: any) => {
  const { mutate } = useParallelEditProduct();

  return (
    <Button
      style={{
        backgroundColor: '#009DAE',
        color: 'white',
        marginRight: 'auto',
        borderRadius: '20px',
        fontSize: '20px',
      }}
      onClick={() => {
        mutate(editedProduct);
      }}
    >
      ذخیره
    </Button>
  );
};

export default SaveButton;
