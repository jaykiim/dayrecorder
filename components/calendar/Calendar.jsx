import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { selectedDate } from '../../store/common'
import Header from './Header'
import Weekday from './Weekday'
import Date from './Date'

const Calendar = () => {
  const [date, setDate] = useRecoilState(selectedDate)
  const [toggle, setToggle] = useState(true)

  return (
    <div className="w-3/4 md:w-full">
      <Header
        clickedDate={date}
        setClickedDate={setDate}
        toggle={toggle}
        setToggle={setToggle}
      />
      {toggle && (
        <div className="pt-4 transition-all">
          <Weekday />
          <Date />
        </div>
      )}
    </div>
  )
}

export default Calendar
