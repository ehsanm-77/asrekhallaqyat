import { AxiosError } from 'axios';
import React from 'react';
import { toast } from 'react-hot-toast';
import { request } from '../instance/instance';

async function editQuantityAndPrice(
  id: string,
  data: { quantity: number; price: number }
) {
  try {
    const res = await request.patch(`products/${id}`, data);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ massage: string }>;
    const { data, status, config } = err.response!;
    toast(data.massage);
  }
}

export default editQuantityAndPrice;
