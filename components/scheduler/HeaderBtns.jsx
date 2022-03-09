import React from 'react'
import BtnLeft from '../micro/BtnLeft'
import BtnText from '../micro/BtnText'
import BtnRight from '../micro/BtnRight'
import BtnToggleSquare from '../micro/BtnToggleSquare'

const HeaderBtns = ({ isWeek, setIsWeek }) => {
  const arrowStyle = {
    container: 'p-2 rounded-md bg-green-300 hover:bg-green-500 cursor-pointer',
    icon: 'text-green-700',
  }

  const todayStyle = {
    container:
      'bg-green-300 py-1 px-4 rounded-md text-green-700 font-bold hover:bg-green-500',
  }

  const recordStyle = {
    container:
      'bg-carrot-light text-white px-3 py-1 rounded-md cursor-pointer hover:bg-carrot-deep',
  }

  return (
    <div className="flex items-center ">
      <div className="flex flex-1 items-center gap-x-1">
        <BtnLeft style={arrowStyle} />
        <BtnText text="Today" style={todayStyle} />
        <BtnRight style={arrowStyle} />
        <BtnToggleSquare toggle={isWeek} setToggle={setIsWeek} />
      </div>
      <BtnText text="Record" style={recordStyle} />
    </div>
  )
}

export default HeaderBtns
