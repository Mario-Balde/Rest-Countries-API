// Redux slice responsible for managing selected region filters

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
