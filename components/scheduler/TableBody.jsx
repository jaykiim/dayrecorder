import React from 'react'
import { useRecoilValueLoadable } from 'recoil'
import { fetchRecords } from '../../store/common'
import { MIN_HEIGHT } from '../../store/constants'
import { getTimeline } from './utils'
import { getDateStamp } from '../calendar/utils'
import { useSession } from 'next-auth/react'
import Record from './Record'

const TableBody = ({ date }) => {
  const email = useSession().data.user.email
  const timeline = getTimeline()
  const datestamp = getDateStamp(date.year, date.month, date.day)
  const { state, contents: records } = useRecoilValueLoadable(
    fetchRecords({ datestamp, email })
  )

  return (
    <>
      {timeline.map((time, i) => (
        <div
          key={i}
          className="border-t border-l"
          style={{ height: MIN_HEIGHT * 30 }}
        ></div>
      ))}

      {state === 'loading' ? (
        <div>loading</div>
      ) : (
        records.map((record, i) => <Record key={i} {...record} />)
      )}
    </>
  )
}

export default TableBody
