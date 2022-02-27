import React from 'react'
import Body from './Body'
import { useRecoilValue } from 'recoil'
import { selectedDate } from '../../store/common'
import { dateObj, getSelectedWeekNo } from '../calendar/utils'
import { getTimeline } from './utils'

const Bodies = ({ isWeek }) => {
  const timeline = getTimeline()

  const date = useRecoilValue(selectedDate)
  const { year, month, day } = dateObj(date)
  const week = getSelectedWeekNo(year, month, day)

  return (
    <main className="relative flex">
      {/*  */}
      {/* GUIDE 타임라인 */}
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

      {/* GUIDE 테이블 */}

      {isWeek ? (
        week.map((day, i) => (
          <Body key={i} order={i + 1} year={year} month={month} day={day} />
        ))
      ) : (
        <Body order={0} year={year} month={month} day={day} />
      )}
    </main>
  )
}

export default Bodies
