import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../app/loginSlice'

export const store = configureStore({
  reducer: {
    loginState: loginReducer,
  },
});


