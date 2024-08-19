import { configureStore } from "@reduxjs/toolkit";
import sidebarSlices from "./slices/sidebarSlices";

const store = configureStore({
  reducer: {
    sidebar: sidebarSlices,
  },
});
export default store;
