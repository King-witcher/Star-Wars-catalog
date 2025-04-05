import { ReactNode } from 'react'
import { Navbar } from '../navbar/navbar'

interface Props {
  children: ReactNode
}

export function RootLayout(props: Props) {
  return (
    <div className="flex flex-col absolute w-dvw h-dvh bg-red overflow-hidden">
      <Navbar />
      <div className="flex-1 flex justify-center overflow-y-auto">
        <div className="flex justify-center w-full min-h-full h-fit p-[20px_40px]">
          <div className="w-full max-w-[1280px]">{props.children}</div>
        </div>
      </div>
    </div>
  )
}
