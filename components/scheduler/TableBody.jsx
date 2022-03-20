import React from 'react'
import { useRecoilStateLoadable } from 'recoil'
import { recordsData } from '../../store/common'
import { MIN_HEIGHT } from '../../store/constants'
import { getTimeline } from './utils'
import { getDateStamp } from '../calendar/utils'
import { useSession } from 'next-auth/react'
import Record from './Record'

// 현재 날짜의 레코드 데이터를 배열로 받아와서 map 돌며 Record 컴포넌트에 넘김
const TableBody = ({ date }) => {
  const email = useSession().data.user.email
  const timeline = getTimeline()
  const datestamp = getDateStamp(date.year, date.month, date.day)

  const [records, setRecords] = useRecoilStateLoadable(
    recordsData({ datestamp, email })
  )

  console.log(records)

  return (
    <>
      {timeline.map((time, i) => (
        <div
          key={i}
          className="border-t border-l"
          style={{ height: MIN_HEIGHT * 30 }}
        ></div>
      ))}

      {records.state === 'loading' ? (
        <div>loading</div>
      ) : (
        records.contents.map((record, i) => (
          <Record
            key={i}
            {...{ ...record, records: records.contents, setRecords }}
          />
        ))
      )}
    </>
  )
}

export default TableBody
