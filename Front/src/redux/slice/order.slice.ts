import { createSlice } from '@reduxjs/toolkit';

type StateType = {
  page: number;
  pageSize: number;
  deliveryStatus?: boolean;
};

const initialState: StateType = {
  page: 0,
  pageSize: 5,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderSetPage(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    changeDelivery(state, action) {
      return {
        ...state,
        deliveryStatus: action.payload === 10 ? false : true,
      };
    },
    changeDeliverys(state) {
      return {
        ...state,
        deliveryStatus: true,
      };
    },
    changeDeliveryToAll(state) {
      return {
        ...initialState,
      };
    },
  },
});

export const {
  orderSetPage,
  changeDelivery,
  changeDeliveryToAll,
  changeDeliverys,
} = orderSlice.actions;

export default orderSlice.reducer;
