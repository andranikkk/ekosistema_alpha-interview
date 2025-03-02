import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../constants"
import type { Book, BooksState } from "../constants/interface"

export const getBooks = createAsyncThunk("books/getBooks", async () => {
  try {
    const resp = await axios.get(`${BASE_URL}/search-books?number=35`, {
      headers: {
        Accept: "application/json",
        "x-api-key": "a24070b0ee634f2894ceb1eb20ec9582",
      },
    })

    return resp.data.books.flatMap((book: any) =>
      book.map((inBook: Omit<Book, "liked">) => ({
        ...inBook,
        liked: false,
      })),
    )
  } catch (error) {
    console.error("Error fetching books", error)
    throw error
  }
})

const initialState: BooksState = {
  books: [],
  likedBooks: [],
  showLiked: false,
  isLoading: true,
}

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<Book[]>) {
      state.books = action.payload
      state.likedBooks = state.books.filter(book => book.liked)
    },
    toggleLike(state, { payload }: PayloadAction<Book>) {
      state.books = state.books.map(book =>
        book.id === payload.id ? { ...book, liked: !book.liked } : book,
      )

      state.likedBooks = state.books.filter(book => book.liked)
    },
    toggleShowLiked(state) {
      state.showLiked = !state.showLiked
    },
    deleteBook(state, action: PayloadAction<number>) {
      state.books = state.books.filter(book => book.id !== action.payload)
      state.likedBooks = state.likedBooks.filter(
        book => book.id !== action.payload,
      )
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getBooks.pending, state => {
        state.isLoading = true
      })

      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.books = action.payload.flat()
        state.likedBooks = state.books.filter(book => book.liked)
      })

      .addCase(getBooks.rejected, state => {
        state.isLoading = false
      })
  },
})

export const { setBooks, toggleLike, toggleShowLiked, deleteBook } =
  booksSlice.actions

export default booksSlice.reducer
