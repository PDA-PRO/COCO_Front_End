import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  id: "",
  pw: "",
  ismanage: false,
};

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.id;
      state.pw = action.pw;
      state.ismanage = action.ismanage;
    },
    logout: (state) => {
      state.id = "";
      state.pw = "";
      state.ismanage = false;
    },
    initlogin: (state) => {
      state.id = initialState.id;
      state.pw = initialState.pw;
      state.ismanage = initialState.ismanage;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { login, logout, initlogin } = loginSlice.actions;

export default loginSlice.reducer;
