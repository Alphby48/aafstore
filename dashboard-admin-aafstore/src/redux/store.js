import { configureStore } from "@reduxjs/toolkit";
import sidebarSlices from "./slices/sidebarSlices";
import mountSlices from "./slices/mountSlice";

const store = configureStore({
  reducer: {
    sidebar: sidebarSlices,
    mounting: mountSlices,
  },
});
export default store;
