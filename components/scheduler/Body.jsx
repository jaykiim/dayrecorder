import React from 'react'
import Minutehand from './Minutehand'
import Record from './Record'
import { dateObj } from '../calendar/utils'
import { dateFormatter, getTimeline } from './utils'
import { useRecoilValue } from 'recoil'
import { currentTime, minutehandPosition } from '../../store/common'

const records = {
  '2022-02-20': [
    {
      id: '9b835d50d3e699c6ed1fa047503e03e6',
      start: '00:03',
      end: '01:17',
      title: '어쌔신 크리드 오디세이',
      memo: '열심히 달려보자!!',
      category: '휴식',
      color: '#839EA0',
    },
  ],
  '2022-02-23': [
    {
      id: 'ae57550f6daa238ba409d2b18173d239',
      start: '01:00',
      end: '01:17',
      title:
        '스케줄 UI 모바일 화면 정리하고 스케줄 UI 모바일 화면 정리 어쩌구 저쩌구',
      memo: '열심히 달려보자!!',
      category: '업무',
      color: '#EB6440',
    },
    {
      id: '05f3354cbbdda23a41a3eabf5f16b20e',
      start: '01:26',
      end: '01:57',
      title: '화장실',
      memo: '열심히 달려보자!!',
      category: '기타',
      color: '#3b82f6',
    },
    {
      id: 'ced0f7be33fca73a98aff8367817ef36',
      start: '02:00',
      end: '03:07',
      title: '한강 공원 달리기',
      memo: '열심히 달려보자!!',
      category: '휴식',
      color: '#839EA0',
    },
  ],
}

const Body = ({ order, year, month, day }) => {
  const today = new Date().getDate()
  const timeline = getTimeline()
  const { day: currentDay, weekday } = dateObj(new Date(year, month, day))

  const time = useRecoilValue(currentTime)
  const timeTagPos = useRecoilValue(minutehandPosition)

  const timeTag = {
    position: 'absolute',
    top: `${timeTagPos}px`,
    width: '44px',
    height: '24px',
    backgroundColor: '#F08D72',
  }

  const dayrecords = records[dateFormatter(year, month, day)]

  return (
    <div className="relative w-full">
      <header className="mt-6 h-fit flex-1 border-l border-b border-green-500 py-3 text-center text-green-700 md:border-green-300">
        <p className="font-bold">{weekday}</p>
        <p>{day}</p>
      </header>

      <section className="relative w-full">
        {/*  */}
        {/* GUIDE 시간 태그 */}

        {order === 1 && (
          <div
            className="flex -translate-y-1/2 -translate-x-12 items-center justify-center rounded-md text-xs font-bold text-white"
            style={timeTag}
          >
            {time}
          </div>
        )}

        <Minutehand today={currentDay === today} minhandPos={timeTagPos} />
        <Record order={order} dayrecords={dayrecords} />

        {/* GUIDE 줄눈 */}

        {timeline.map((time, i) => {
          return (
            <div
              key={i}
              className={`h-24 w-full p-1 ${
                i !== 0 && 'border-t'
              } border-l border-green-500 md:border-green-300`}
            ></div>
          )
        })}
      </section>
    </div>
  )
}

export default Body
