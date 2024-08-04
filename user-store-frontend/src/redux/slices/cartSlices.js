import { createSlice } from "@reduxjs/toolkit";
const localS = JSON.parse(localStorage.getItem("token"))
  ? JSON.parse(localStorage.getItem("token"))
  : { id: 1 };
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: JSON.parse(localStorage.getItem(localS.id)) || [],
  },
  reducers: {
    addToCart: (state, action) => {
      const cekData = state.data.find((sd) => sd._id === action.payload._id);
      if (cekData) {
        cekData.qty += action.payload.qty;
      } else {
        state.data.push(action.payload);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
