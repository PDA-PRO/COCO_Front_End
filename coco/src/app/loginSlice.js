import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  pw: "",
}

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState, 
  reducers: {
    login:(state, action) => {
      state.id = action.id
      state.pw = action.pw
    },
    logout:(state) => {
      state.id = "";
      state.pw = "";
    }
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
