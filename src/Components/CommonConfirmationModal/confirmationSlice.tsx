import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  title: "",
  message: "",
};

const confirmationSlice = createSlice({
  name: "confirmation",
  initialState,
  reducers: {
    showDialog: (state, action) => {
      console.log("🚀 ~ action:", action.payload);
      state.show = true;
      (state.title = action.payload.title),
        (state.message = action.payload.message);
    },
    hideDialog: (state) => {
      state.show = false;
    },
  },
});

export const { showDialog, hideDialog } = confirmationSlice.actions;
export default confirmationSlice.reducer;
