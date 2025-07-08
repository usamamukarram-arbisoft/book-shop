import { configureStore } from "@reduxjs/toolkit";

import addtocardreducer from "../Components/AddToCart/AddtoCartslice";
import productReducer from "../Components/Products/ProductsSlice";
import searchReducer from "../Components/Search/SearchSlice";
import SignInReducer from "../Components/SignIn/SinginSlice";

export const store = configureStore({
  reducer: {
    auth: SignInReducer,
    drawer: addtocardreducer,
    search: searchReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
