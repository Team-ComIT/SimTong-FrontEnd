import { configureStore } from '@reduxjs/toolkit';
import signIn from './logged';

export const store = configureStore({
  reducer: {
    login: signIn,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
