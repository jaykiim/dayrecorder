import React, { useState } from 'react'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isRecording, selectedDate } from '../../store/common'
import StartModal from './StartModal'
import RecordStarter from '../micro/RecordStarter'
import { useRecorder } from '../../hooks/useRecorder'

const Header = ({ width, isWeek, setIsWeek }) => {
  const setSelectedDate = useSetRecoilState(selectedDate)

  const [modal, setModal] = useState(false)

  const { startRecording, stopRecording } = useRecorder()
  const recording = useRecoilValue(isRecording)
  console.log('recording: ', recording)

  return (
    <div className="flex">
      {width < 768 && <div className="flex-1" />}
      <div className="mx-3 flex gap-3 md:mx-0 md:flex-1">
        <section className="flex gap-x-1">
          <button className="btnGreen md:text-md text-xs">
            <MdArrowBackIosNew className="text-green-700" />
          </button>
          <button
            onClick={() => setSelectedDate(new Date())}
            className="btnGreen md:text-md text-xs font-semibold"
          >
            Today
          </button>
          <button className="btnGreen md:text-md text-xs">
            <MdArrowForwardIos className="text-green-700" />
          </button>
        </section>

        {width >= 1280 && (
          <section
            onClick={() => setIsWeek(!isWeek)}
            className="relative flex h-8 w-32 cursor-pointer items-center gap-2 rounded-md bg-green-300 p-1 font-semibold"
          >
            <div
              className={`${
                !isWeek && 'translate-x-16'
              } text-bold absolute top-1 h-6 w-14 rounded-md bg-white text-center font-bold text-carrot-light shadow-sm transition-all`}
            >
              {isWeek ? 'Week' : 'Day'}
            </div>
            <div className="flex-1 text-center">Week</div>
            <div className="flex-1 text-center">Day</div>
          </section>
        )}
      </div>

      {recording ? (
        <RecordStarter label="stop" cb={stopRecording} />
      ) : (
        <RecordStarter label="start" cb={() => setModal(true)} />
      )}

      {modal && (
        <StartModal setModal={setModal} startRecording={startRecording} />
      )}
    </div>
  )
}

export default Header
