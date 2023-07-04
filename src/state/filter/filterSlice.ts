import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    city: null,
    type: [],
  },
  reducers: {
    saveCity: (state, action) => {
      state.city = action.payload;
    },
    saveType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { saveCity, saveType } = filterSlice.actions;
export default filterSlice.reducer;
