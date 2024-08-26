import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react"

import { FaRegHeart } from "react-icons/fa"
import { FaHeart } from "react-icons/fa6"
import { DeleteIcon } from "./button-icons/deleteIcon"

import type { IBook } from "../../constants/interface"

export const BookBlock: React.FC<IBook> = ({ book, onLike, onDelete }) => {
  const [isLiked, setIsLiked] = useState(book.liked)

  const navigate = useNavigate()

  useEffect(() => {
    setIsLiked(book.liked)
  }, [book.liked])

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()

    setIsLiked(!isLiked)

    onLike(book)
  }

  return (
    <Card
      isPressable
      onClick={() => navigate(`/book/${book.id}`)}
      key={book.id}
      className="p-3 w-[300px] h-[500px] gap-2"
    >
      <CardHeader>
        <h4 className="font-bold text-large text-wrap line-clamp-2 max-h-[55px] truncate">
          {book.title}
        </h4>
      </CardHeader>
      <CardBody>
        <h4 className="text-default-500 text-wrap line-clamp-3 truncate">
          {book.subtitle}
        </h4>
      </CardBody>
      <div className="flex gap-1 w-full justify-center">
        <Image
          className="h-[300px] w-[185px]"
          src={book.image}
          alt={book.title}
        />
        <div className="flex flex-col gap-3 justify-around">
          <div
            onClick={handleLike}
            className={`flex flex-col p-4 rounded-xl items-center ${isLiked ? "bg-red-400" : "bg-pink-300"} hover:bg-pink-400`}
          >
            {isLiked ? <FaHeart size={25} /> : <FaRegHeart size={25} />}
            <p>{isLiked ? "Dislike" : "Like"}</p>
          </div>
          <div
            onClick={e => {
              e.stopPropagation()
              onDelete(book.id)
            }}
            className="flex flex-col bg-slate-300 p-4 rounded-xl items-center hover:bg-slate-400"
          >
            <DeleteIcon />
            <p>Delete</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
