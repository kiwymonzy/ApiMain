import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'properties',
  initialState: {
    properties: [],
    featuredProperties: [],
    favouriteProperties: [],
    selectedProperty: {},
  },
  reducers: {
    saveProperties: (state, action) => {
      state.properties = action.payload;
    },
    saveFeaturedProperties: (state, action) => {
      state.featuredProperties = action.payload;
    },
    saveFavouriteProperties: (state, action) => {
      state.favouriteProperties = action.payload;
    },
    saveSelectedProperty: (state, action) => {
      state.selectedProperty = action.payload;
    },
  },
});

export const {
  saveProperties,
  saveFeaturedProperties,
  saveSelectedProperty,
  saveFavouriteProperties,
} = userSlice.actions;
export default userSlice.reducer;
