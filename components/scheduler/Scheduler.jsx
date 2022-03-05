import React, { useState } from 'react'
import { useWindowSize } from 'react-use'
import Header from './Header'
import Bodies from './Bodies'

const Scheduler = () => {
  const { width } = useWindowSize()
  const [isWeek, setIsWeek] = useState(width >= 1280 ? true : false)
  const [loading, setLoading] = useState(true)
  return (
    <>
      <h1
        className={`${
          width < 768 && 'hidden'
        } border-b border-green-300 p-4 px-5 text-xl font-black uppercase`}
      >
        Scheduler
      </h1>
      {loading && <div className="absolute top-1/2 right-1/4">loading</div>}
      <section className="relative flex flex-col border-t py-5 px-2 md:border-none md:p-5">
        <Header width={width} isWeek={isWeek} setIsWeek={setIsWeek} />
        <Bodies isWeek={isWeek} loading={loading} setLoading={setLoading} />
      </section>
    </>
  )
}

export default Scheduler
