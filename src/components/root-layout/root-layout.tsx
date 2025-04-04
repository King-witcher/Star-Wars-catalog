import { ReactNode } from 'react'
import { Navbar } from '../navbar/navbar'

interface Props {
  children: ReactNode
}

export function RootLayout(props: Props) {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center w-full px-[40px] py-[20px]">
        <div className="w-full max-w-[1280px]">{props.children}</div>
      </div>
    </>
  )
}
