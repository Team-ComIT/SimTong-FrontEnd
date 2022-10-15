import { configureStore } from "@reduxjs/toolkit";
import signIn from "./logged";

export const store = configureStore({
  reducer: {
    login: signIn,
  },
});
