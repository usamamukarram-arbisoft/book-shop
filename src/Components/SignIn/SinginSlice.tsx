import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserState } from "../../Types/Types";

const initialState: UserState = {
  user: { email: "usama@gmail.com", password: "12345" },
  isLoggedIn: false,
};

const SignInslice = createSlice({
  name: "SignIn",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      const { email, password } = action.payload;

      if (email === state.user.email && password === state.user.password) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
  },
});

export const { loginUser } = SignInslice.actions;
export default SignInslice.reducer;
