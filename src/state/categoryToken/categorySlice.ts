import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    category: 0,
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload.category;
    },
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
