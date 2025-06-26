import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "../../Types/Types";

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

const SignInslice = createSlice({
  name: "SignIn",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loginUser, logout } = SignInslice.actions;
export default SignInslice.reducer;
