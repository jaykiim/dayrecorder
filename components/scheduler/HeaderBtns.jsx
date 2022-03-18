import React, { useState } from 'react'
import BtnLeft from '../micro/BtnLeft'
import BtnText from '../micro/BtnText'
import BtnRight from '../micro/BtnRight'
import BtnToggleSquare from '../micro/BtnToggleSquare'
import RecordCreateModal from './RecordCreateModal'
import { useRecorder } from '../../hooks/useRecorder'

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
  const { recording, startRecording, stopRecording } = useRecorder()

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
        {recording ? (
          <button onClick={stopRecording} className={recordStyle}>
            Stop
          </button>
        ) : (
          <button onClick={() => setModal(!modal)} className={recordStyle}>
            Record
          </button>
        )}

        {modal && (
          <RecordCreateModal
            setModal={setModal}
            startRecording={startRecording}
          />
        )}
      </div>
    </div>
  )
}

export default HeaderBtns
