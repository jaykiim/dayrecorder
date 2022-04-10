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

      <section className="bodyContainer overflow-y-auto">
        <HeaderBtns isWeek={isWeek} setIsWeek={setIsWeek} />

        <DateContainer isWeek={isWeek} />
        <div className="mt-5 flex overflow-y-auto">
          <TimeLine />
          <TableContainer isWeek={isWeek} />
        </div>
      </section>
    </>
  )
}

export default Scheduler
