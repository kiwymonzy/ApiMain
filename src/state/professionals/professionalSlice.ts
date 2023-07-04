import { createSlice } from '@reduxjs/toolkit';

export const professionalSlice = createSlice({
  name: 'properties',
  initialState: {
    professionals: [],
    featuredProfessionals: [],
    selectedProfessional: {},
    selectedProfessionalCategory: '',
  },
  reducers: {
    saveProfessionals: (state, action) => {
      state.professionals = action.payload;
    },
    saveFeaturedProfessionals: (state, action) => {
      state.featuredProfessionals = action.payload;
    },
    saveSelectedProfessional: (state, action) => {
      state.selectedProfessional = action.payload;
    },
    saveSelectedProfessionalCategory: (state, action) => {
      state.selectedProfessionalCategory = action.payload;
    },
  },
});

export const {
  saveProfessionals,
  saveFeaturedProfessionals,
  saveSelectedProfessional,
  saveSelectedProfessionalCategory,
} = professionalSlice.actions;
export default professionalSlice.reducer;
