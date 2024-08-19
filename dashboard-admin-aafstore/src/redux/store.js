import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slices/sidebarSlices";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
});
export default store;
