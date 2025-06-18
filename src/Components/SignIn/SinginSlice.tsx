import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserState } from "../../Types/Types";

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

const SignInslice = createSlice({
  name: "SignIn",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { loginUser, logout } = SignInslice.actions;
export default SignInslice.reducer;
