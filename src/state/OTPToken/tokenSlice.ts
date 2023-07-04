import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: '',
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
