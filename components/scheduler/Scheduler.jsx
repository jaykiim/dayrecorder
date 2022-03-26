import React, { useState } from 'react'
import { useWindowSize } from 'react-use'
import { XLARGE } from '../../store/constants'
import Title from '../micro/Title'
import HeaderBtns from './HeaderBtns'
import DateContainer from './DateContainer'
import TimeLine from './TimeLine'
import TableContainer from './TableContainer'

const Scheduler = () => {
  // 브라우저 너비
  const { width } = useWindowSize()

  // 주간 뷰 (좁은 화면에서는 기본값 false)
  const [isWeek, setIsWeek] = useState(width < XLARGE ? false : true)

  return (
    <>
      <Title title="scheduler" />

      <section className="bodyContainer">
        <HeaderBtns isWeek={isWeek} setIsWeek={setIsWeek} />

        <div className="mt-5">
          <DateContainer isWeek={isWeek} />

          <div className="flex overflow-y-scroll " style={{ height: 712 }}>
            <TimeLine />
            <TableContainer isWeek={isWeek} />
          </div>
        </div>
      </section>
    </>
  )
}

export default Scheduler
