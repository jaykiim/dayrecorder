import React from 'react'
import { TABLE_HEADER_HEIGHT } from '../../store/constants'
import { dateObj } from '../calendar/utils'
import { dateFormatter } from '../scheduler/utils'

const TableHeader = ({ date, isWeek }) => {
  const [year, month, day] = dateFormatter(
    date.year,
    date.month,
    date.day
  ).split('-')

  const { weekday } = dateObj(new Date(year, month - 1, day))

  return (
    <section
      className="flex flex-col items-center text-green-900"
      style={{
        height: TABLE_HEADER_HEIGHT,
        width: isWeek ? 'calc(100% / 7)' : '100%',
      }}
    >
      <div className="font-bold">{weekday}</div>
      <div className="flex flex-1 items-center">{day}</div>
    </section>
  )
}

export default TableHeader
