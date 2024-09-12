import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchAPIData from '../../utils/fetchAPIData';

const url = 'http://localhost:3002/api/v1/categories';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const data = fetchAPIData(url);
    return data;
  }
);

const cartSlice = createSlice({
  name: 'categories',
  initialState: { categories: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'success';
        state.categories = action.payload.data.categories;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = 'failed';
      }),
});

export default cartSlice.reducer;
