import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderData {
  data: any[];
  total: number | null;
}

interface ProductData {
  data: any[];
  total: number | null;
}

interface QuantityData {
  data: any[];
  total: number | null;
}

interface DataState {
  orderData: OrderData;
  productData: ProductData;
  quantityData: QuantityData;
}

const initialState: DataState = {
  orderData: {
    data: [],
    total: null,
  },
  productData: {
    data: [],
    total: null,
  },
  quantityData: {
    data: [],
    total: null,
  },
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateOrderData: (
      state,
      action: PayloadAction<{ data: any[]; total: number }>
    ) => {
      state.orderData.data = action.payload.data;
      state.orderData.total = action.payload.total;
    },
    updateProductData: (
      state,
      action: PayloadAction<{ data: any[]; total: number }>
    ) => {
      state.productData.data = action.payload.data;
      state.productData.total = action.payload.total;
    },
    updateQuantityData: (
      state,
      action: PayloadAction<{ data: any[]; total: number }>
    ) => {
      state.quantityData.data = action.payload.data;
      state.quantityData.total = action.payload.total;
    },
  },
});

export const { updateOrderData, updateProductData, updateQuantityData } =
  dataSlice.actions;

export default dataSlice.reducer;
