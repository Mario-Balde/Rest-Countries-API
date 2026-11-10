/* Configures the global Redux store by combining the region 
and search reducers for application-wide state management. */

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
