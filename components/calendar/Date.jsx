import React from 'react'
import { useRecoilState } from 'recoil'
import { selectedDate } from '../../store/common'
import { dateUtil } from '../../utils'

const CalendarDate = () => {
  // 클릭된 일자
  const [clickedDate, setClickedDate] = useRecoilState(selectedDate)
  const clickedDatestamp = dateUtil.dateConverter({
    date: clickedDate,
    to: 'yyyy-mm-dd',
  })

  // 같은 달의 모든 일자 ("prev.31" 또는 "next.1" 또는 숫자)
  const daysOfMonth = dateUtil.daysOfMonth({
    dateInstance: clickedDate,
    datestamp: true,
  })

  // 오늘 날짜
  const today = dateUtil.dateConverter({ date: new Date(), to: 'yyyy-mm-dd' })

  // 스타일
  const style = (datestamp) => {
    const thisMonth = clickedDate.getMonth() + 1 === +datestamp.split('-')[1]
    const style = ''

    // 오늘 날짜
    if (datestamp === today) style = 'rounded-full bg-green-700 text-white'

    // 클릭된 날짜
    if (datestamp === clickedDatestamp && datestamp !== today)
      style = 'rounded-full bg-green-500 text-white'

    // 다른 달 날짜
    if (!thisMonth) style = style + ' text-green-500'

    return style
  }

  return (
    <section className="grid grid-cols-7">
      {daysOfMonth.map((datestamp, i) => (
        <div
          key={i}
          className={
            'flex h-9 cursor-pointer items-center justify-center text-xs ' +
            style(datestamp)
          }
          onClick={() => setClickedDate(new Date(datestamp))}
        >
          {datestamp.split('-')[2]}
        </div>
      ))}
    </section>
  )
}

export default CalendarDate
