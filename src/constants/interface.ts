export interface Book {
  id: number
  title: string
  subtitle: string
  image: string
  liked: boolean
}

export interface BooksState {
  books: Book[]
  likedBooks: Book[]
  showLiked: boolean
  isLoading: boolean
}

export interface IBook {
  book: Book
  onLike: (book: Book) => void
  onDelete: (id: number) => void
}
