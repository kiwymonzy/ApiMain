/* eslint-disable */
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import tokenSlice from './OTPToken/tokenSlice';
import categorySlice from './categoryToken/categorySlice';
import globalState from './global/index';
import propertiesState from './properties/propertySlice';
import newsSlice from './news/newsSlice';
import professionalSlice from './professionals/professionalSlice';
import filterSlice from './filter/filterSlice';
import suppliersSlice from './suppliers/suppliersSlice';

export default configureStore({
  reducer: {
    auth: userSlice,
    token: tokenSlice,
    category: categorySlice,
    professional: professionalSlice,
    supplier: suppliersSlice,
    globalState: globalState,
    properties: propertiesState,
    news: newsSlice,
    filter: filterSlice,
  },
});
