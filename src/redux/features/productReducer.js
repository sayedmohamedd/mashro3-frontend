import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import URL from './../../utils/url';

const url = `${URL}/api/v1/products`;

// Get All Products
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async ({ page, category, sort }) => {
    let res;
    if (category === '') {
      res = await axios.get(url + `?page=${page}&sort=${sort}`);
    } else {
      res = await axios.get(
        url + `?page=${page}&category=${category}&sort=${sort}`
      );
    }
    return res.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: { products: [], status: 'idle', page: 1 },
  reducers: {
    nextPage: (state) => {
      state.page = state.page + 1;
    },
    prevPage: (state) => {
      if (state.page > 1) {
        state.page = state.page - 1;
      }
    },
    resetPage: (state) => {
      state.page = 1;
    },
    removeProductFromState: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'success';
        state.products = action.payload.data.products;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {
  getAllProducts,
  nextPage,
  prevPage,
  resetPage,
  removeProductFromState,
} = productSlice.actions;
export default productSlice.reducer;
