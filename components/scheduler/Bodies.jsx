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

  // 현재 보고 있는 날짜가 속해 있는 주의 모든 일자를 배열로 가져옴 ex. [6, 7, 8, 9, 10, 11, 12]
  const date = useRecoilValue(selectedDate)
  const { year, month, day } = dateObj(date)
  const week = getSelectedWeekNo(year, month, day)

  const [records, setRecords] = useRecoilState(allRecords)

  // week 배열의 첫 번째 날과 마지막 날을 2022-03-01 같은 식으로 만들고
  // useEffect에서 주간 레코드를 한번에 가져온다
  const [firstday, lastday] = [
    dateFormatter(year, month, week[0]),
    dateFormatter(year, month, week[6]),
  ]

  useEffect(() => {
    const getRecords = async () => {
      // 주간 레코드 가져오기
      const records = await getWeeklyRecordsReq(user.email, firstday, lastday)

      // records 데이터를 다 받아왔을때만 (= loading이 false일 때) Body를 렌더
      setLoading(false)

      // records 상태에 주간 레코드 저장
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
            order={1}
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
