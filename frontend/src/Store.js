import { configureStore } from '@reduxjs/toolkit'
import CartReducer from "./reducers/Cart";
import UserReducer from "./reducers/User";

export const store = configureStore({
    reducer: {
        cart:CartReducer,
        user:UserReducer,
    },
  
})