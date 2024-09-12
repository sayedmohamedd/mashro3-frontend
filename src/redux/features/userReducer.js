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
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
