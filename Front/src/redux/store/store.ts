import { configureStore } from '@reduxjs/toolkit';
import productReducer from '@/redux/slice/product.slice';
import orderReducer from '@/redux/slice/order.slice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from '../slice/userSlice';
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
  reducer: {
    productSlice: productReducer,
    orderSlice: orderReducer,
    userState: persistedReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
export const persistor = persistStore(store);
