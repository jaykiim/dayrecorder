import React, { useState } from 'react'
import BtnLeft from '../micro/BtnLeft'
import BtnText from '../micro/BtnText'
import BtnRight from '../micro/BtnRight'
import BtnToggleSquare from '../micro/BtnToggleSquare'
import RecordCreateModal from './RecordCreateModal'

const HeaderBtns = ({ isWeek, setIsWeek }) => {
  const arrowStyle = {
    container: 'p-2 rounded-md bg-green-300 hover:bg-green-500 cursor-pointer',
    icon: 'text-green-700',
  }

  const todayStyle =
    'bg-green-300 py-1 px-4 rounded-md text-green-700 font-bold hover:bg-green-500'

  const recordStyle =
    'bg-carrot-light text-white px-3 py-1 rounded-md cursor-pointer hover:bg-carrot-deep'

  const [modal, setModal] = useState(false)

  return (
    <div className="flex items-center ">
      <div className="flex flex-1 items-center gap-x-1">
        <BtnLeft style={arrowStyle} />
        <BtnText text="Today" style={todayStyle} />
        <BtnRight style={arrowStyle} />
        <BtnToggleSquare toggle={isWeek} setToggle={setIsWeek} />
      </div>

      <div className="relative">
        {/* 시간 기록 시작 버튼 */}
        <BtnText
          btnClick={() => setModal(!modal)}
          text="Record"
          style={recordStyle}
        />
        {modal && <RecordCreateModal />}
      </div>
    </div>
  )
}

export default HeaderBtns
