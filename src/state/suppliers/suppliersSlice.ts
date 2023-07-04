import { createSlice } from '@reduxjs/toolkit';

export const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState: {
    suppliers: [],
    featuredSuppliers: [],
    selectedSupplier: {},
    selectedSupplierCategory: '',
  },
  reducers: {
    saveSuppliers: (state, action) => {
      state.suppliers = action.payload;
    },
    saveFeaturedSuppliers: (state, action) => {
      state.featuredSuppliers = action.payload;
    },
    saveSelectedSupplier: (state, action) => {
      state.selectedSupplier = action.payload;
    },
    saveSelectedSupplierCategory: (state, action) => {
      state.selectedSupplierCategory = action.payload;
    },
  },
});

export const {
  saveSuppliers,
  saveFeaturedSuppliers,
  saveSelectedSupplier,
  saveSelectedSupplierCategory,
} = suppliersSlice.actions;
export default suppliersSlice.reducer;
