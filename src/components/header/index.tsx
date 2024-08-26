// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { toggleShowLiked } from "../../app/slice"
import { Button, Navbar } from "@nextui-org/react"

import type { IHeader } from "./interface"
import { useAppDispatch } from "../../app/hooks"

export const Header: React.FC<IHeader> = () => {
  const dispatch = useAppDispatch()

  return (
    <Navbar className="h-[60px] w-full shadow-md rounded-br-3xl rounded-bl-3xl flex justify-center items-center">
      <div className="flex justify-center w-full items-center">
        <Button onClick={() => dispatch(toggleShowLiked())}>Liked books</Button>
      </div>
    </Navbar>
  )
}
