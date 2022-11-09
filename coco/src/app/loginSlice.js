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
      console.log(action);
      state.id += action.id
      state.pw += action.pw
    }
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
