import { createSlice } from "@reduxjs/toolkit";

type loggedType = {
  loggedIn: boolean;
};

const initialState: loggedType = {
  loggedIn: false,
};

export const signIn = createSlice({
  name: "login",
  initialState,
  reducers: {
    logged: (state, props) => {
      state.loggedIn = props.payload;
    },
  },
});

export const { logged } = signIn.actions;

export default signIn.reducer;
