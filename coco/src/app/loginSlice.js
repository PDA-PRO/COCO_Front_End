import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  access_token: "",
  token_type: "",
  id: "",
  name: "",
  role: null,
  exp: 0,
  tutor: null,
};

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.access_token = action.access_token;
      state.token_type = action.ptoken_typew;
      state.id = action.id;
      state.name = action.name;
      state.role = action.role;
      state.exp = action.exp;
      state.imagetoken = action.imagetoken;
      state.tutor = action.tutor;
    },
    logout: (state) => {
      state.access_token = "";
      state.token_type = "";
      state.id = "";
      state.name = "";
      state.role = null;
      state.exp = 0;
      state.imagetoken = -1;
      state.tutor = null;
    },
    initlogin: (state) => {
      state.access_token = initialState.access_token;
      state.token_type = initialState.ptoken_typew;
      state.id = initialState.id;
      state.name = initialState.name;
      state.role = initialState.role;
      state.exp = initialState.exp;
      state.imagetoken = initialState.imagetoken;
      state.tutor = initialState.tutor;
    },
    changimage: (state, action) => {
      state = state;
      state.imagetoken = action.imagetoken;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export var { login, logout, initlogin, changimage } = loginSlice.actions;

export default loginSlice.reducer;
