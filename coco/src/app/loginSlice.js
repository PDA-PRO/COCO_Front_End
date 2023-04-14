import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  access_token: "",
  token_type: "",
  id: "",
  role: null,
  exp: 0,
  level: 1
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
      state.exp = action.exp;
      state.level = action.level;
    },
    logout: (state) => {
      state.access_token = "";
      state.token_type = "";
      state.id = "";
      state.role = null;
      state.exp = 0;
      state.level = 1;
    },
    initlogin: (state) => {
      state.access_token = initialState.access_token;
      state.token_type = initialState.ptoken_typew;
      state.id = initialState.id;
      state.role = initialState.role;
      state.exp = initialState.exp;
      state.level = initialState.level;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { login, logout, initlogin } = loginSlice.actions;

export default loginSlice.reducer;
