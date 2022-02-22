import React, { useState } from 'react'
import Header from './Header'
import Body from './Body'

const Calendar = ({ date, setDate }) => {
  const [toggle, setToggle] = useState(true)

  return (
    <div className="w-3/4 md:w-full">
      <Header
        date={date}
        setDate={setDate}
        toggle={toggle}
        setToggle={setToggle}
      />
      {toggle && <Body date={date} setDate={setDate} />}
    </div>
  )
}

export default Calendar
