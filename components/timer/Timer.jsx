import dynamic from 'next/dynamic'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useWindowSize } from 'react-use'
import { isTimerOn } from '../../store/common'
import TimeSelector from './TimeSelector'
import TimerTitle from './TimerTitle'
import TimerBody from './TimerBody'
import TimerStarter from './TimerStarter'
import { useRecorder } from '../../hooks/useRecorder'

const Timer = () => {
  // 열림/닫힘
  const [timerOpen, setTimerOpen] = useState(false)

  // 시간 옵션
  const options = [60, 90, 120, 150, 180]
  const [optionNum, setOptionNum] = useState(0)

  // 시작 상태
  const [started, setStarted] = useRecoilState(isTimerOn)
  useEffect(() => {
    window.localStorage.getItem('elapsed-time')
      ? setStarted(true)
      : setStarted(false)
  }, [])

  // 완료 상태
  const [finish, setFinish] = useState(false)

  // 폭죽
  const { width, height } = useWindowSize()
  const Confetti = dynamic(() => import('react-confetti'), { ssr: false })

  // 타이머 및 경과 시간
  const timerId = useRef(null)
  const elapsedTime = Number(window.localStorage.getItem('elapsed-time')) || 0

  // 시간 경과에 따른 재렌더를 위해 상태 생성
  const [min, setMin] = useState(elapsedTime)

  // 레코드 생성 메소드
  const { stopRecording } = useRecorder()

  // 타이머가 시작될 때
  useEffect(() => {
    if (started) {
      window.localStorage.setItem('elapsed-time', elapsedTime)
      timerId.current = setInterval(() => {
        elapsedTime++
        window.localStorage.setItem('elapsed-time', elapsedTime)
        setMin(elapsedTime)
      }, 60 * 1000)
    }

    return () => timerId.current && clearInterval(timerId.current)
  }, [started, elapsedTime])

  // 타이머 끝까지 갔을 때
  useEffect(() => {
    if (min === options[optionNum]) {
      clearInterval(timerId.current)
      setFinish(true)
    }
  }, [min, options, optionNum, started])

  const handleFinish = () => {
    window.localStorage.removeItem('elapsed-time') // 경과 시간 제거
    setStarted(false) // interval 타이머 동작 종료
    setMin(0) // 화면에 보여지는 경과 시간 0으로 맞추고
    stopRecording() // 레코드 등록 후
    setFinish(false) // 축하 화면 없애기
  }

  return (
    <>
      {finish && (
        <div className="absolute top-0 left-0 z-40 h-screen w-screen bg-black bg-opacity-40">
          <Confetti width={width} height={height} />
          <div className="absolute top-1/2 left-1/2 flex -translate-y-1/2 -translate-x-1/2 flex-col items-center">
            <h1 className="flex justify-center text-5xl font-black text-gray-100 opacity-90">
              🎉 타이머 완료 !!
            </h1>
            <button
              onClick={handleFinish}
              className="mt-8 w-fit cursor-pointer rounded-md bg-gray-700 bg-opacity-80 py-2 px-4 text-lg text-gray-200 hover:bg-gray-500"
            >
              확인
            </button>
          </div>
        </div>
      )}

      <div className="mt-5 w-full border-t border-green-500 pt-5">
        <section className="relative mr-2 mb-4 flex md:px-2">
          <TimerTitle timerOpen={timerOpen} setTimerOpen={setTimerOpen} />

          <div className="absolute top-0 right-2 flex">
            <TimeSelector
              options={options}
              optionNum={optionNum}
              setOptionNum={setOptionNum}
            />

            <TimerStarter started={started} setStarted={setStarted} />
          </div>
        </section>

        {timerOpen && (
          <TimerBody options={options} optionNum={optionNum} min={min} />
        )}
      </div>
    </>
  )
}

export default Timer
