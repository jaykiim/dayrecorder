import React, { useState } from 'react'
import { useWindowSize } from 'react-use'
import Header from './Header'
import Body from './Body'

const Scheduler = () => {
  const { width } = useWindowSize()
  const [isWeek, setIsWeek] = useState(width >= 1024 ? true : false)

  return (
    <>
      <h1
        className={`${
          width < 768 && 'hidden'
        } border-b border-green-300 p-4 px-5 text-xl font-black uppercase`}
      >
        Scheduler
      </h1>
      <section className="flex flex-col border-t py-5 px-2 md:border-none md:p-5">
        <Header width={width} isWeek={isWeek} setIsWeek={setIsWeek} />
        <Body isWeek={isWeek} />
      </section>
    </>
  )
}

export default Scheduler
