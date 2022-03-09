import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { selectedDate } from '../../store/common'
import Title from '../micro/Title'
import HeaderBtns from './HeaderBtns'
import TableBody from './TableBody'
import TableHeader from './TableHeader'
import TimeLine from './TimeLine'

const Scheduler = () => {
  const [isWeek, setIsWeek] = useState(false)
  const clickedDate = useRecoilValue(selectedDate)

  return (
    <>
      <Title title="scheduler" />

      <section className="bodyContainer">
        <HeaderBtns isWeek={isWeek} setIsWeek={setIsWeek} />

        <div className="mt-5">
          {/* ===============================================================================================================================  
            // GUIDE 날짜 
          =============================================================================================================================== */}

          <div className="mb-3 flex">
            <div style={{ width: 39.55 }} />
            <TableHeader clickedDate={clickedDate} />
          </div>

          {/* ===============================================================================================================================  
            // GUIDE 타임라인 - 타임테이블 
          =============================================================================================================================== */}

          <div className="flex overflow-y-scroll " style={{ height: 712 }}>
            <div className="pr-2">
              <TimeLine />
            </div>

            <div className="w-full">
              <TableBody />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Scheduler
