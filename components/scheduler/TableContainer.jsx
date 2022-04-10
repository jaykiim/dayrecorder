import React from 'react'
import { useRecoilValue } from 'recoil'
import { selectedDate } from '../../store/common'
import { dateUtil } from '../../utils'
import Table from './Table'

const TableContainer = ({ isWeek }) => {
  const date = useRecoilValue(selectedDate)
  const dateObject = dateUtil.dateConverter({ date, to: 'object' })
  const week = dateUtil.daysOfSameWeek({ dateInstance: date })

  return (
    <div className="flex w-full ">
      {isWeek ? (
        week.map((date, i) => (
          <div
            key={i}
            style={{ width: 'calc(100% / 7)', position: 'relative' }}
          >
            <Table key={i} dateObject={{ ...dateObject, date }} />
          </div>
        ))
      ) : (
        <div className="relative w-full">
          <Table dateObject={dateObject} />
        </div>
      )}
    </div>
  )
}

export default TableContainer
