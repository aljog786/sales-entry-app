import { configureStore } from "@reduxjs/toolkit";
import salesReducer from "@/store/slices/salesSlice";

export const store = configureStore({
  reducer: {
    sales: salesReducer,
  },
});
