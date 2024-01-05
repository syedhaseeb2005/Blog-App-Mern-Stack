import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isFetching: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
    },
    loginFailed: (state) => {
      state.error = true;
    },
    logout: (state) => {
      state.user = null;
      state.isFetching = false;
    },
    updateStart: (state) => {
        state.isFetching = true;
    },
    updateSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
      state.error = false;
    },
    updateFailed: (state) => {
      state.error = true;
    },
  },
});
export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logout,
  updateStart,
  updateSuccess,
  updateFailed,
} = userSlice.actions;
export default userSlice.reducer;
