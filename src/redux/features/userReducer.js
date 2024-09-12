import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')),
    status: 'idle',
    error: '',
  },
  reducers: {
    login: (state) => {
      state.user = JSON.parse(localStorage.getItem('user'));
    },
    logout: (state) => {
      state.user = undefined;
    },
  },
  // extraReducers: (builder) =>
  //   builder
  //     .addCase(login.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(login.fulfilled, (state, action) => {
  //       state.status = 'success';
  //       state.user = action.payload.data.user;
  //     })
  //     .addCase(login.rejected, (state, action) => {
  //       state.status = 'failed';
  //       state.error = action.payload;
  //     }),
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
