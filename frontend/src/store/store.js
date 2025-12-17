import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";
import favoritesReducer from "./favoritesSlice.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});

export default store;
