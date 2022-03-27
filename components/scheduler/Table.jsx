import React from 'react'
import { useRecoilStateLoadable, useRecoilValue } from 'recoil'
import { minutehandPosition, recordsData } from '../../store/common'
import { ONE_MINUTE_HEIGHT } from '../../store/constants'
import { dateUtil, timeUtil } from '../../utils'
import { useSession } from 'next-auth/react'
import Record from './Record'
import Minutehand from './Minutehand'

// 현재 날짜의 레코드 데이터를 배열로 받아와서 map 돌며 Record 컴포넌트에 넘김
const Table = ({ dateObject }) => {
  const email = useSession().data.user.email
  const timeline = timeUtil.getTimeline()

  const datestamp = dateUtil.dateConverter({
    date: dateObject,
    to: 'yyyy-mm-dd',
  })

  const isTodayRecord = new Date().getDate() === Number(datestamp.split('-')[2])
  const minhandPos = useRecoilValue(minutehandPosition)

  const [records, setRecords] = useRecoilStateLoadable(
    recordsData({ datestamp, email })
  )

  return (
    <>
      <Minutehand today={isTodayRecord} minhandPos={minhandPos} />

      {timeline.map((time, i) => (
        <div
          id={time}
          key={i}
          className="border-t border-l"
          style={{ height: ONE_MINUTE_HEIGHT * 30 }}
        ></div>
      ))}

      {records.state === 'loading' ? (
        <div>loading</div>
      ) : (
        records.contents?.map((record, i) => (
          <Record
            key={i}
            {...{ ...record, records: records.contents, setRecords }}
          />
        ))
      )}
    </>
  )
}

export default Table
