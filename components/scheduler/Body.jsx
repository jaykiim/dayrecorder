import React from 'react'
import { useRecoilValue } from 'recoil'
import { selectedDate } from '../../store/common'
import { dateObj } from '../calendar/utils'
import { getTimeline } from './utils'

const Body = ({ isWeek }) => {
  const timeline = getTimeline()
  const date = useRecoilValue(selectedDate)
  const { day, weekday } = dateObj(date)

  return (
    <>
      <header className="mt-6 h-fit flex-1 border-b border-green-500 text-center md:border-green-300">
        <p className="font-bold">{weekday}</p>
        <p>{day}</p>
      </header>

      <section>
        {timeline.map((time, i) => {
          return (
            <div key={i} className="flex h-24 text-xs">
              <span
                className={`border-r border-green-500 pr-3 md:border-green-300 ${
                  time === '00:00' && 'text-green-300 md:text-white'
                }`}
              >
                {time}
              </span>
              {i !== 0 && (
                <div className="w-full translate-y-2 border-t border-green-500 md:border-green-300"></div>
              )}
            </div>
          )
        })}
      </section>
    </>
  )
}

export default Body
