import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  title: "",
  message: "",
  displayBtn: false,
};

const confirmationSlice = createSlice({
  name: "confirmation",
  initialState,
  reducers: {
    showDialog: (state, action) => {
      state.show = true;
      (state.title = action.payload.title),
        (state.message = action.payload.message);
      state.displayBtn = action.payload.displayBtn;
    },
    hideDialog: (state) => {
      state.show = false;
    },
  },
});

export const { showDialog, hideDialog } = confirmationSlice.actions;
export default confirmationSlice.reducer;
