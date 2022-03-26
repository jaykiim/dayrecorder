import React from 'react'
import { useRecoilValue } from 'recoil'
import { selectedDate } from '../../store/common'
import { dateUtil } from '../../utils'
import Date from './Date'

const DateContainer = ({ isWeek }) => {
  const date = useRecoilValue(selectedDate)
  const dateObject = dateUtil.dateConverter({ date, to: 'object' })
  const week = dateUtil.daysOfSameWeek(date)

  return (
    <div className="mb-3 mr-2 flex">
      <div style={{ width: 39.55 }} />
      {isWeek ? (
        week.map((date, i) => (
          <Date key={i} isWeek={isWeek} dateObject={{ ...dateObject, date }} />
        ))
      ) : (
        <Date isWeek={isWeek} dateObject={dateObject} />
      )}
    </div>
  )
}

export default DateContainer
