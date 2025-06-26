import { configureStore } from "@reduxjs/toolkit";
import SignInReducer from "../Components/SignIn/SinginSlice";
import addtocardreducer from "../Components/AddToCart/AddtoCartslice";

export const store = configureStore({
  reducer: {
    auth: SignInReducer,
    drawer: addtocardreducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
