import React from 'react'
import {
  AiFillCalendar,
  AiFillCheckCircle,
  AiFillSetting,
  AiOutlineAreaChart,
} from 'react-icons/ai'

const LeftRemote = () => {
  return (
    <div
      id="LeftRemoteContainer"
      className="w-30 sticky flex flex-col md:h-full"
    >
      <div className="m-2 flex items-center justify-end gap-x-2 gap-y-8 rounded-lg bg-green-900 p-2 px-3 md:m-0 md:h-full md:flex-col md:justify-start md:rounded-2xl md:px-5 md:py-8">
        <AiFillCalendar className="leftRemoteIcon" />
        <AiFillCheckCircle className="leftRemoteIcon" />
        <AiOutlineAreaChart className="leftRemoteIcon" />
        <AiFillSetting className="leftRemoteIcon" />
      </div>
    </div>
  )
}

export default LeftRemote
