import React, { useState } from 'react'
import { useWindowSize } from 'react-use'
import { useRecoilValue } from 'recoil'
import { selectedDate } from '../../store/common'
import { XLARGE } from '../../store/constants'
import { dateObj, getSelectedWeekNo } from '../calendar/utils'
import Title from '../micro/Title'
import HeaderBtns from './HeaderBtns'
import TableBody from './TableBody'
import TableHeader from './TableHeader'
import TimeLine from './TimeLine'

const Scheduler = () => {
  // 브라우저 너비
  const { width } = useWindowSize()

  // 주간 뷰
  const [isWeek, setIsWeek] = useState(width < XLARGE ? false : true)

  // 달력에서 클릭된 날짜
  const clickedDate = useRecoilValue(selectedDate)
  const { year, month, day } = dateObj(clickedDate)

  // 달력에서 클릭된 날짜가 속한 주의 모든 날짜
  const week = getSelectedWeekNo(year, month, day)

  return (
    <>
      <Title title="scheduler" />

      <section className="bodyContainer">
        <HeaderBtns isWeek={isWeek} setIsWeek={setIsWeek} />

        <div className="mt-5">
          {/* ===============================================================================================================================  
            // GUIDE 날짜 
          =============================================================================================================================== */}

          <div className="mb-3 mr-2 flex">
            <div style={{ width: 39.55 }} />
            {isWeek ? (
              week.map((day, i) => (
                <TableHeader
                  key={i}
                  isWeek={isWeek}
                  date={{ year, month, day }}
                />
              ))
            ) : (
              <TableHeader isWeek={isWeek} date={{ year, month, day }} />
            )}
          </div>

          {/* ===============================================================================================================================  
            // GUIDE 타임라인 - 타임테이블 
          =============================================================================================================================== */}

          <div className="flex overflow-y-scroll " style={{ height: 712 }}>
            <div className="pr-2">
              <TimeLine />
            </div>

            <div className="flex w-full">
              {isWeek ? (
                <>
                  {week.map((_, i) => (
                    <div style={{ width: 'calc(100% / 7)' }}>
                      <TableBody key={i} />
                    </div>
                  ))}
                </>
              ) : (
                <div className="w-full">
                  <TableBody />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Scheduler
