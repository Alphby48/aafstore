import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    side: false,
  },
  reducers: {
    sideAct: (state, action) => {
      state.side = action.payload;
    },
  },
});

export const { sideAct } = sidebarSlice.actions;
export default sidebarSlice.reducer;
