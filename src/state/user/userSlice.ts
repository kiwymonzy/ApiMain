import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'auth',
  initialState: {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    is_active: false,
    has_paid: false,
    is_verified: false,
  },
  reducers: {
    signIn: (state, action) => {
      state.id = action.payload.id;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.is_active = action.payload.is_active;
      state.has_paid = action.payload.has_paid;
      state.is_verified = action.payload.is_verified;
    },
    signOut: (state) => {
      state.id = 0;
      state.firstname = '';
      state.lastname = '';
      state.email = '';
      state.is_active = false;
      state.has_paid = false;
      state.is_verified = false;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;
