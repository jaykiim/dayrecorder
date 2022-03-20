import React from 'react'
import MainTap from '../components/container/MainTap'
import SideTap from '../components/container/SideTap'
import Statistics from '../components/statistics/Statistics'
import Calendar from '../components/calendar/Calendar'
import { useRecoilState } from 'recoil'
import { selectedDate } from '../store/common'

const statistics = () => {
  const [date, setDate] = useRecoilState(selectedDate)
  return (
    <>
      <SideTap>
        <Calendar date={date} setDate={setDate} />
      </SideTap>
      <MainTap>
        <Statistics />
      </MainTap>
    </>
  )
}

statistics.auth = true
export default statistics
