import React, { useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { BsPlayCircle, BsStopCircle } from 'react-icons/bs'
import { useRecorder } from '../../hooks/useRecorder'
import { useSetRecoilState } from 'recoil'
import { isTimerOn } from '../../store/common'

const TodoRecorder = ({ todo, color }) => {
  const currentlyRecordingId = JSON.parse(
    window.localStorage.getItem('recording')
  )?.todoId

  const [recording, setRecording] = useState(
    currentlyRecordingId ? currentlyRecordingId === todo.id && true : false
  )

  const setTimer = useSetRecoilState(isTimerOn)

  const { startRecording, stopRecording } = useRecorder()

  const handleStart = () => {
    // 이전에 기록 중이던 것이 있으면 등록
    stopRecording()

    startRecording(null, todo.title, color, null, todo.id) // 레코드 시작 정보 기록
    setRecording(true) // 버튼 교체
    setTimer(true) // 타이머 동작
  }

  const handleStop = () => {
    stopRecording() // 레코드 등록
    setRecording(false) // 버튼 교체
    window.localStorage.removeItem('elapsed-time') // 기록 삭제
    setTimer(false) // interval 타이머 종료
  }

  return (
    <div
      data-tip={recording ? '기록 중지' : '기록 시작'}
      className="mr-3 cursor-pointer"
    >
      <ReactTooltip backgroundColor="#e5e5e54d" textColor="#404040" />
      {recording ? (
        <BsStopCircle onClick={handleStop} className="text-xl text-red-600" />
      ) : (
        <BsPlayCircle
          onClick={handleStart}
          className="text-xl text-gray-300 hover:text-red-600"
        />
      )}
    </div>
  )
}

export default TodoRecorder
