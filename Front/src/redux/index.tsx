import store, { RootState, AppDispatch } from './store/store';
import {
  updateOrderData,
  updateProductData,
  updateQuantityData,
} from './slice/slice';

const updatedOrderData: any[] = [];
const updatedProductData: any[] = [];
const updatedQuantityData: any[] = [];

const newTotalValue: number = 100;

store.dispatch(
  updateOrderData({ data: updatedOrderData, total: newTotalValue })
);
store.dispatch(
  updateProductData({ data: updatedProductData, total: newTotalValue })
);
store.dispatch(
  updateQuantityData({ data: updatedQuantityData, total: newTotalValue })
);

const state: RootState = store.getState();
console.log(state);
