import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productReducer';
import cartReducer from './features/cartReducer';
import categoryReducer from './features/categoryReducer';
import userReducer from './features/userReducer';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    categories: categoryReducer,
    user: userReducer,
  },
});

export default store;
