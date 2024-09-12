import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchAPIData from '../../utils/fetchAPIData';
const url = 'http://localhost:3002/api/v1/cart';

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
  initialState: { cart: [], status: 'idle' },
  reducers: {
    resetCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchCartProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.status = 'success';
        state.cart = action.payload.data.cart;
      })
      .addCase(fetchCartProducts.rejected, (state) => {
        state.status = 'failed';
      }),
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
