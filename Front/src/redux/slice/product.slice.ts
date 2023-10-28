import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'productSlice',
  initialState: { page: 0, pageSize: 5, field: '', sort: null },
  reducers: {
    productSetPage: (state, action) => {
      return { ...state, ...action.payload };
    },
    handleSortingProducts: (state, { payload }) => {
      const [payloadObj] = payload;
      if (payloadObj) {
        return { ...state, field: payloadObj.field, sort: payloadObj.sort };
      } else {
        return { ...state, field: undefined, sort: undefined };
      }
    },
  },
});

export const { handleSortingProducts, productSetPage } = productSlice.actions;

export default productSlice.reducer;
