import React from 'react'
import { useRecoilValue } from 'recoil'
import { currentTime, minutehandPosition } from '../../store/common'
import { ONE_MINUTE_HEIGHT } from '../../store/constants'
import { getTimeline } from '../scheduler/utils'

const TimeLine = () => {
  const timeline = getTimeline()
  const time = useRecoilValue(currentTime)
  const timeTagPos = useRecoilValue(minutehandPosition)

  return (
    <div className="relative pr-4">
      <div
        className="absolute z-30 -translate-y-1/2 rounded-sm bg-carrot-light px-1 text-sm text-white"
        style={{ top: timeTagPos + 'px' }}
      >
        {time}
      </div>

      {timeline.map((time, i) => (
        <div key={i} style={{ height: ONE_MINUTE_HEIGHT * 30 }}>
          <p className="-translate-y-2 text-xs text-green-700">
            {time === '00:00' ? '' : time}
          </p>
        </div>
      ))}
    </div>
  )
}

export default TimeLine
