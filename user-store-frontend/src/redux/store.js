import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlices";

const store = configureStore({
  reducer: { cart: cartReducer },
});
// console.log("create store : ", store.getState());

// store.subscribe(() => {
//   console.log("STORE CHANGE : ", store.getState());
// });

export default store;
