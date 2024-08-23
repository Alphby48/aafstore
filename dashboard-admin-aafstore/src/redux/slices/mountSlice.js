import { createSlice } from "@reduxjs/toolkit";

const mountSlice = createSlice({
  name: "sidebar",
  initialState: {
    mount: false,
  },
  reducers: {
    mountAct: (state, action) => {
      state.mount = action.payload;
    },
  },
});

export const { mountAct } = mountSlice.actions;
export default mountSlice.reducer;
