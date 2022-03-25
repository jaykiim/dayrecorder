import React, { useState } from 'react'
import { useRecorder } from '../../hooks/useRecorder'
import RecordCreateModal from '../scheduler/RecordCreateModal'

const TimerStarter = ({ started, setStarted }) => {
  // 레코드 생성창
  const [modal, setModal] = useState(false)

  // 레코드 생성 메소드
  const { startRecording, stopRecording } = useRecorder()

  const handleClick = () => {
    // 타이머 켜져있을 때 누르면 타이머 종료 및 레코드 등록
    if (started) {
      setStarted(false) // interval 타이머 동작 끄기
      window.localStorage.removeItem('elapsed-time') // 경과 시간 삭제
      stopRecording() // 레코드 등록
    } else setModal(!modal)
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="ml-2 rounded-md px-3 font-bold text-white hover:shadow-xl"
        style={{ backgroundColor: '#b91c1c80', height: '26px' }}
      >
        {started ? 'Stop' : 'Start'}
      </button>

      {modal && (
        <RecordCreateModal
          setModal={setModal}
          startRecording={startRecording}
          cb={() => setStarted(true)}
        />
      )}
    </>
  )
}

export default TimerStarter
