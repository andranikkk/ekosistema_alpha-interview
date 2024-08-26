import { configureStore } from "@reduxjs/toolkit"
// import { booksApi } from "./api"
import booksSlice from "./slice"

export const store = configureStore({
  reducer: {
    books: booksSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
