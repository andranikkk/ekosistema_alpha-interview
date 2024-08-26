import axios from "axios"
import type React from "react"
import { useEffect, useState } from "react"
import { BASE_URL } from "../constants"
import { useParams } from "react-router-dom"
import { Card, Image } from "@nextui-org/react"
import GoBack from "./GoBack"

type Props = {}

export const BookPage: React.FC<Props> = () => {
  const [booksData, setBooksData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const params = useParams()

  useEffect(() => {
    const fetchBooksData = async () => {
      setLoading(true)

      try {
        const response = await axios.get(`${BASE_URL}/${params.id}`, {
          headers: {
            Accept: "application/json",
            "x-api-key": "e7d7090fc7df4c3b8c98ccb7460fee49",
          },
        })

        setBooksData(response.data)
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchBooksData()
  }, [params.id])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!booksData) return <div>No data available</div>

  return (
    <div className="w-screen h-screen items-center justify-center flex">
      <Card className="w-[80%] h-[80%] p-5">
        <GoBack />
        <div className="text-center">
          <p className="text-3xl font-semibold">{booksData.title}</p>
        </div>
        <div className="flex flex-row gap-5 p-5">
          <div>
            <Image src={booksData.image} className="w-[220px] h-[400px]" />
          </div>

          <div className="text-xl">
            <p>
              <span className="font-semibold">Authors:</span>{" "}
              {booksData.authors && booksData.authors[0]?.name}
            </p>
            <p>
              <span className="font-semibold">Publish date:</span>{" "}
              {booksData.publish_date}
            </p>
            <p>
              <span className="font-semibold">Number of pages:</span>{" "}
              {booksData.number_of_pages}
            </p>
            <p>
              <span className="font-semibold">Subtitle:</span>{" "}
              {booksData.subtitle}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
