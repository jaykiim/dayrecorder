import React from 'react'
import { AiOutlineDown } from 'react-icons/ai'

const TimerTitle = ({ timerOpen, setTimerOpen }) => {
  return (
    <div className="flex items-center">
      <button
        onClick={() => setTimerOpen(!timerOpen)}
        className="mr-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-green-500"
      >
        <AiOutlineDown className="text-green-700" />
      </button>

      <h1 className="text-lg font-black uppercase tracking-wider text-green-900">
        timer
      </h1>
    </div>
  )
}

export default TimerTitle
