import React from 'react'
import Body from './Body'
import { useRecoilValue } from 'recoil'
import { selectedDate } from '../../store/common'
import { dateObj, getSelectedWeekNo } from '../calendar/utils'
import { getTimeline } from './utils'

const Bodies = ({ isWeek }) => {
  console.log(isWeek)
  const timeline = getTimeline()
  const date = useRecoilValue(selectedDate)
  const { year, month, day } = dateObj(date)
  const week = getSelectedWeekNo(year, month, day)

  return (
    <main className="flex">
      <div>
        {timeline.map((time, i) => (
          <div key={i}>
            {i === 0 && <div className="h-24"></div>}
            <p
              className={`h-24 -translate-y-2 pr-3 text-xs text-green-700 ${
                time === '00:00' && 'text-green-300 md:text-white'
              }`}
            >
              {time}
            </p>
          </div>
        ))}
      </div>

      {isWeek ? (
        week.map((day, i) => (
          <Body key={i} year={year} month={month} day={day} />
        ))
      ) : (
        <Body year={year} month={month} day={day} />
      )}
    </main>
  )
}

export default Bodies
