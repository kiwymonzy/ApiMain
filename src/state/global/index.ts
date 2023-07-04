import { createSlice } from '@reduxjs/toolkit';

export const global = createSlice({
  name: 'general',
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = global.actions;
export default global.reducer;
