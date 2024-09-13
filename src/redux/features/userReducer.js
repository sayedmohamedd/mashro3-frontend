import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : undefined,
    status: 'idle',
    error: '',
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('user', action.payload.user);
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = undefined;
    },
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
