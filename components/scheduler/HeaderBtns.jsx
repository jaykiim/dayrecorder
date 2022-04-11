import React, { useState } from 'react'
import RecordCreateModal from './RecordCreateModal'
import { BtnLeft, BtnText, BtnRight, BtnToggleSquare } from '../micro'
import { useRecorder } from '../../hooks/useRecorder'
import { useRecoilState } from 'recoil'
import { selectedDate } from '../../store/common'
import { dateUtil } from '../../utils'

const HeaderBtns = ({ isWeek, setIsWeek }) => {
  const arrowStyle = {
    container: 'p-2 rounded-md bg-green-300 hover:bg-green-500 cursor-pointer',
    icon: 'text-green-700',
  }

  const todayStyle =
    'bg-green-300 py-1 px-4 rounded-md text-green-700 font-bold hover:bg-green-500'

  const recordStyle =
    'bg-carrot-light text-white px-3 py-1 rounded-md cursor-pointer hover:bg-carrot-deep'

  // 현재 레코딩 중인지 아닌지, 레코딩 시작, 레코딩 중지 및 레코드 등록
  const { recording, startRecording, stopRecording } = useRecorder()

  // 레코드 시작 모달 열림 닫힘
  const [modal, setModal] = useState(false)

  // 현재 클릭된 날짜
  const [clickedDate, setClickedDate] = useRecoilState(selectedDate)

  // 이전, 다음 날짜 버튼 클릭
  const prevDate = dateUtil.prevDatestamp(clickedDate)
  const nextDate = dateUtil.nextDatestamp(clickedDate)

  return (
    <div className="flex items-center ">
      <div className="flex flex-1 items-center gap-x-1">
        <BtnLeft btnClick={() => setClickedDate(prevDate)} style={arrowStyle} />
        <BtnText
          btnClick={() => setClickedDate(new Date())}
          text="Today"
          style={todayStyle}
        />
        <BtnRight
          btnClick={() => setClickedDate(nextDate)}
          style={arrowStyle}
        />
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
