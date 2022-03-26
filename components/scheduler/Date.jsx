import React from 'react'
import { useRecoilValue } from 'recoil'
import { selectedDate } from '../../store/common'
import { dateUtil } from '../../utils'

const TableDate = ({ dateObject, isWeek }) => {
  // 현재 넘어온 날짜 객체 (일자가 next. 또는 prev. 인 경우 올바른 날짜로 고침)
  const correctedObject = dateUtil.dateConverter({
    date: dateObject,
    to: 'object',
  })
  const { date: currentDate, weekday } = correctedObject

  // 현재 넘어온 날짜 스탬프
  const currentDatestamp = dateUtil.dateConverter({
    date: correctedObject,
    to: 'yyyy-mm-dd',
  })

  // 클릭된 날짜 스탬프
  const date = useRecoilValue(selectedDate)
  const clickedDate = dateUtil.dateConverter({
    date,
    to: 'yyyy-mm-dd',
  })

  // 오늘 날짜 스탬프
  const today = dateUtil.dateConverter({
    date: new Date(),
    to: 'yyyy-mm-dd',
  })

  // 현재 넘어온 날짜가 클릭된 날짜거나 오늘인 경우 적용할 스타일
  const style =
    currentDatestamp === today
      ? 'bg-green-700 text-white'
      : currentDatestamp === clickedDate
      ? 'bg-green-500 text-white'
      : ''

  return (
    <section
      className="text-center text-green-900"
      style={{
        height: '64px',
        width: isWeek ? 'calc(100% / 7)' : '100%',
      }}
    >
      <div className="font-bold">{weekday}</div>

      <div className="flex justify-center">
        <div
          className={
            'flex h-10 w-10 items-center justify-center rounded-full ' + style
          }
        >
          {currentDate}
        </div>
      </div>
    </section>
  )
}

export default TableDate
