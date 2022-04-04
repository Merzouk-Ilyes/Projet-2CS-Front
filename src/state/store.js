import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./auth_slice"

export const store = configureStore({
  reducer: authReducer
})