import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Body from './Body'
import { useRecoilState, useRecoilValue } from 'recoil'
import { selectedDate, allRecords } from '../../store/common'
import { dateObj, getSelectedWeekNo } from '../calendar/utils'
import { dateFormatter, getTimeline } from './utils'
import { getWeeklyRecordsReq } from '../../apiCalls/recordCalls'

const Bodies = ({ isWeek, loading, setLoading }) => {
  const timeline = getTimeline()
  const user = useSession().data.user

  const date = useRecoilValue(selectedDate)
  const { year, month, day } = dateObj(date)
  const week = getSelectedWeekNo(year, month, day)

  const [records, setRecords] = useRecoilState(allRecords)

  const [firstday, lastday] = [
    dateFormatter(year, month, week[0]),
    dateFormatter(year, month, week[6]),
  ]

  useEffect(() => {
    const getRecords = async () => {
      const records = await getWeeklyRecordsReq(user.email, firstday, lastday)
      setLoading(false)
      setRecords(records)
    }

    getRecords()
  }, [])

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

      {!loading &&
        (isWeek ? (
          week.map((day, i) => (
            <Body
              key={i}
              order={i + 1}
              year={year}
              month={month}
              day={day}
              user={user}
              records={records}
              setRecords={setRecords}
              loading={loading}
            />
          ))
        ) : (
          <Body
            order={0}
            year={year}
            month={month}
            day={day}
            records={records}
            setRecords={setRecords}
            loading={loading}
          />
        ))}
    </main>
  )
}

export default Bodies
