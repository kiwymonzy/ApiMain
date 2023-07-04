import { createSlice } from '@reduxjs/toolkit';

export const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    selectednews: {},
  },
  reducers: {
    saveNews: (state, action) => {
      state.news = action.payload;
    },
    saveSelectedNews: (state, action) => {
      state.selectednews = action.payload;
    },
  },
});

export const { saveNews, saveSelectedNews } = newsSlice.actions;
export default newsSlice.reducer;
