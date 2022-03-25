import React from 'react'
import { useMeasure } from 'react-use'
import { useCanvas } from '../../hooks/useCanvas'
import { Clock } from './lib'

const TimerBody = ({ options, optionNum, min }) => {
  const [ref, { width }] = useMeasure()

  const clock = new Clock(width)
  const drawClock = (ctx) => clock.drawArc(ctx, options[optionNum], min)
  const drawIndicator = (ctx) => clock.drawIndicator(ctx, options[optionNum])

  const canvasRef = useCanvas(width, width, [drawClock, drawIndicator])

  return (
    <section ref={ref} className="w-full" style={{ height: width }}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </section>
  )
}

export default TimerBody
