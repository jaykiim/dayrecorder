import React from 'react'
import { MIN_HEIGHT } from '../../store/constants'
import { getTimeline } from '../scheduler/utils'

const TimeLine = () => {
  const timeline = getTimeline()

  return (
    <>
      {timeline.map((time, i) => (
        <div key={i} style={{ height: MIN_HEIGHT * 30 }}>
          <p className="-translate-y-2 text-xs text-green-700">
            {time === '00:00' ? '' : time}
          </p>
        </div>
      ))}
    </>
  )
}

export default TimeLine
