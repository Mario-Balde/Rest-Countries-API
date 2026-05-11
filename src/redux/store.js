// Configure global Redux store for application state management

import { configureStore } from "@reduxjs/toolkit";
import regionReducer from "./regionSlice";
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    region: regionReducer,
    search: searchReducer,
  },
});

export default store;
