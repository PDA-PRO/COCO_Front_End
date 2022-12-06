import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../app/loginSlice";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { useDispatch, useSelector } from "react-redux";

const reducers = combineReducers({
  loginState: loginReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
