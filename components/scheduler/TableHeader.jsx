import React from 'react'
import { TABLE_HEADER_HEIGHT } from '../../store/constants'
import { dateObj } from '../calendar/utils'

const TableHeader = ({ clickedDate }) => {
  const { day, weekday } = dateObj(clickedDate)

  return (
    <section
      className="flex w-full flex-col items-center text-green-900"
      style={{ height: TABLE_HEADER_HEIGHT }}
    >
      <div className="font-bold">{weekday}</div>
      <div className="flex flex-1 items-center">{day}</div>
    </section>
  )
}

export default TableHeader
