import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
};

const SearchSlice = createSlice({
  name: "Search",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    clearSearchQuery(state) {
      state.searchQuery = "";
    },
  },
});

export const { setSearchQuery, clearSearchQuery } = SearchSlice.actions;
export default SearchSlice.reducer;
