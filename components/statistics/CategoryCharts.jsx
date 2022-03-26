import { useSession } from 'next-auth/react'
import React from 'react'
import { useRecoilValue, useRecoilValueLoadable } from 'recoil'
import { recordsBetween, recordsData, selectedDate } from '../../store/common'
import { dateUtil } from '../../utils'
import BarChart from './BarChart'
import {
  getColors,
  getMonthFirstLast,
  getRecordsByCat,
  getTags,
  getWeekdaysFromDate,
} from './utils'

const CategoryCharts = ({ selectedFilter }) => {
  const email = useSession().data.user.email

  const date = useRecoilValue(selectedDate)
  const datestamp = dateUtil.dateConverter({ date, to: 'yyyy-mm-dd' })

  const [weekFirst, weekLast] = getWeekdaysFromDate(date)
  const [monthFirst, monthLast] = getMonthFirstLast(date)

  console.log(monthFirst, monthLast)

  const records =
    selectedFilter === 0
      ? useRecoilValueLoadable(recordsData({ datestamp, email }))
      : selectedFilter === 1
      ? useRecoilValueLoadable(
          recordsBetween({ email, firstday: weekFirst, lastday: weekLast })
        )
      : useRecoilValueLoadable(
          recordsBetween({ email, firstday: monthFirst, lastday: monthLast })
        )

  return (
    <>
      {records.state === 'hasValue' && (
        <BarChart
          recordsByCat={getRecordsByCat(records.contents)}
          tags={getTags(records.contents)}
          colors={getColors(records.contents)}
        />
      )}
    </>
  )
}

export default CategoryCharts
