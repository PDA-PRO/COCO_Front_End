import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../app/loginSlice";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { useDispatch, useSelector } from "react-redux";

//여러개의 reducer를 합친다
// store에 저장되는 리듀서는 오직 1개
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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
