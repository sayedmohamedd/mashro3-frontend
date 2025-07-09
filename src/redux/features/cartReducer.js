import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchAPIData from '../../utils/fetchAPIData';
import URL from './../../utils/url';

const url = `${URL}/api/v1/cart`;

export const fetchCartProducts = createAsyncThunk(
  'cart/fetchCartProducts',
  async () => {
    try {
      const data = fetchAPIData(url);
      return data;
    } catch (err) {
      return err.data.response.message;
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cart: [], status: 'idle', numberOfProducts: 0 },
  reducers: {
    resetCart: (state) => {
      state.cart = [];
    },
    increaseProduct: (state, action) => {
      const index = state.cart.findIndex((item) => item._id === action.payload);
      if (index !== -1) {
        state.cart[index].number += 1;
        state.numberOfProducts += 1;
      }
    },
    decreaseProduct: (state, action) => {
      const index = state.cart.findIndex((item) => item._id === action.payload);
      if (index !== -1) {
        state.cart[index].number -= 1;
        state.numberOfProducts -= 1;
      }
    },
    deleteProduct: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    addToCart: (state, action) => {},
  },

  extraReducers: (builder) =>
    builder
      .addCase(fetchCartProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.status = 'success';
        state.cart = action.payload.data.cart;
        state.numberOfProducts = action.payload.data.numberOfProducts;
        localStorage.setItem('cart', JSON.stringify(action.payload.data.cart));
      })
      .addCase(fetchCartProducts.rejected, (state) => {
        state.status = 'failed';
      }),
});

export const {
  resetCart,
  increaseProduct,
  decreaseProduct,
  deleteProduct,
  addToCart,
} = cartSlice.actions;
export default cartSlice.reducer;
