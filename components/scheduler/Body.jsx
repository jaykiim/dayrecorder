import React from 'react'
import Minutehand from './Minutehand'
import { dateObj } from '../calendar/utils'
import { getTimeline } from './utils'
import { useRecoilValue } from 'recoil'
import { currentTime, minutehandPosition } from '../../store/common'

const Body = ({ order, year, month, day }) => {
  const today = new Date().getDate()
  const timeline = getTimeline()
  const { day: currentDay, weekday } = dateObj(new Date(year, month, day))

  const time = useRecoilValue(currentTime)
  const timeTagPos = useRecoilValue(minutehandPosition)

  const timeTag = {
    position: 'absolute',
    top: `${timeTagPos}px`,
    width: '44px',
    height: '24px',
    backgroundColor: '#F08D72',
  }

  return (
    <div className="w-full">
      <header className="mt-6 h-fit flex-1 border-l border-b border-green-500 py-3 text-center text-green-700 md:border-green-300">
        <p className="font-bold">{weekday}</p>
        <p>{day}</p>
      </header>

      <section className="relative w-full">
        {/*  */}
        {/* GUIDE 시간 태그 */}

        {order === 0 && (
          <div
            className="flex -translate-y-1/2 -translate-x-12 items-center justify-center rounded-md text-xs font-bold text-white"
            style={timeTag}
          >
            {time}
          </div>
        )}

        <Minutehand today={currentDay === today} minhandPos={timeTagPos} />

        {/* GUIDE 줄눈 */}

        {timeline.map((time, i) => {
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
