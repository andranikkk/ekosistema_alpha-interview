// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import type { Book } from "./slice"
// import { BASE_URL } from "../constants"

// interface FetchedBook {
//   available: number
//   number: number
//   offset: number
//   books: Book[]
// }

// export const booksApi = createApi({
//   reducerPath: "booksApi",
//   baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
//   endpoints: builder => ({
//     getBooks: builder.query<FetchedBook, void>({
//       query: () => ({
//         url: "/search-books?number=35",
//         headers: {
//           Accept: "application/json",
//           "x-api-key": "e7d7090fc7df4c3b8c98ccb7460fee49",
//         },
//       }),
//     }),
//   }),
// })

// export const { useGetBooksQuery } = booksApi
