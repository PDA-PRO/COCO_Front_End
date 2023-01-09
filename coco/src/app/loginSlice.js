import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  access_token: "",
  token_type: "",
  id: "",
  role: null,
};

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.access_token = action.access_token;
      state.token_type = action.ptoken_typew;
      state.id = action.id;
      state.role = action.role;
    },
    logout: (state) => {
      state.access_token = "";
      state.token_type = "";
      state.id = "";
      state.role = null;
    },
    initlogin: (state) => {
      state.access_token = initialState.access_token;
      state.token_type = initialState.ptoken_typew;
      state.id = initialState.id;
      state.role = initialState.role;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { login, logout, initlogin } = loginSlice.actions;

export default loginSlice.reducer;
