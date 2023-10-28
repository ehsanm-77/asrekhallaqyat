import { useMutation } from '@tanstack/react-query';
import React from 'react';
import axios from 'axios';
import editQuantityAndPrice from './editQuantity&Price';
import { toast } from 'react-toastify';

function useParallelEditProduct() {
  return useMutation({
    mutationFn: async (products) => {
      try {
        const x = await axios.all(
          products.map((product) =>
            editQuantityAndPrice(product._id, {
              quantity: product.quantity,
              price: product.price,
            })
          )
        );
        toast.success('محصولات با موفقیت ویرایش شدند', { autoClose: 2000 });
        return x;
      } catch (err) {
        console.log(err);
      }
    },
  });
}

export default useParallelEditProduct;
