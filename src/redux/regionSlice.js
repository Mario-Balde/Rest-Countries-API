// Redux slice that manages the selected geographical region filter and provides the action to update it.

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedRegion: "All",
};

const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    setRegion: (state, action) => {
      state.selectedRegion = action.payload;
    },
  },
});
export const { setRegion } = regionSlice.actions;
export default regionSlice.reducer;
