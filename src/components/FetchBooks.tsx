import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { deleteBook, getBooks, toggleLike } from "../app/slice"
import type { Book } from "../constants/interface"

import { BookBlock } from "./book-block"
import { Header } from "./header"

const BookFetcher: React.FC = () => {
  const dispatch = useAppDispatch()
  const likedBooks = useAppSelector(state => state.books.likedBooks)
  const showLikedBooks = useAppSelector(state => state.books.showLiked)
  const { books, isLoading } = useAppSelector(state => state.books)

  useEffect(() => {
    dispatch(getBooks())
  }, [dispatch])

  const displayedBooks = showLikedBooks ? likedBooks : books?.flat() || []

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="flex-wrap flex gap-5 p-4 justify-center">
      <Header />
      {displayedBooks.length === 0 && (
        <div>
          {showLikedBooks ? "No liked books available" : "No books available"}
        </div>
      )}
      {displayedBooks.map((book: Book) => (
        <BookBlock
          key={book.id}
          book={book}
          onLike={likedBook => {
            dispatch(toggleLike(likedBook))
          }}
          onDelete={id => {
            dispatch(deleteBook(id))
          }}
        />
      ))}
    </div>
  )
}

export default BookFetcher
