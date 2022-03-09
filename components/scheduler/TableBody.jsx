import React from 'react'
import { MIN_HEIGHT } from '../../store/constants'
import { getTimeline } from './utils'

const TableBody = () => {
  const timeline = getTimeline()
  return (
    <>
      {timeline.map((time, i) => (
        <div
          key={i}
          className="border-t border-l"
          style={{ height: MIN_HEIGHT * 30 }}
        ></div>
      ))}
    </>
  )
}

export default TableBody
