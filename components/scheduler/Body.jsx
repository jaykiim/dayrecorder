import React from 'react'
import { dateObj } from '../calendar/utils'
import { getTimeline } from './utils'

const Body = ({ year, month, day }) => {
  const timeline = getTimeline()
  const { weekday } = dateObj(new Date(year, month, day))

  return (
    <div className="w-full">
      <header className="mt-6 h-fit flex-1 border-l border-b border-green-500 py-3 text-center text-green-700 md:border-green-300">
        <p className="font-bold">{weekday}</p>
        <p>{day}</p>
      </header>

      <section className="w-full">
        {timeline.map((_, i) => {
          return (
            <div
              key={i}
              className={`h-24 w-full ${
                i !== 0 && 'border-t'
              } border-l border-green-500 md:border-green-300`}
            ></div>
          )
        })}
      </section>
    </div>
  )
}

export default Body
