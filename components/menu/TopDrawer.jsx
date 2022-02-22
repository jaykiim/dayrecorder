import React from 'react'
import { MdSchedule } from 'react-icons/md'
import { AiOutlineCheck } from 'react-icons/ai'

const TopDrawer = ({ toggleDrawer }) => {
  return (
    <div
      className={`absolute z-30 h-1/4 w-full bg-gray-50 shadow-sm ${
        toggleDrawer ? 'translate-y-0' : '-translate-y-full'
      } flex flex-col pt-20 pl-14 duration-300 ease-in-out `}
    >
      <h1 className="font-logo pb-3 text-2xl font-bold text-gray-700">
        🚀 Dream Booster
      </h1>
      <p className="ml-9 pb-4 text-sm italic text-gray-500">
        당신의 꿈을 응원합니다!
      </p>
      <hr className="pb-10" />
      <ul className="w-3/4">
        <li className="drawerMenuItem">
          <MdSchedule className="drawerMenuIcon" /> 일과표
        </li>

        <li className="drawerMenuItem">
          <AiOutlineCheck className="drawerMenuIcon" />할 일
        </li>
      </ul>
    </div>
  )
}

export default TopDrawer
