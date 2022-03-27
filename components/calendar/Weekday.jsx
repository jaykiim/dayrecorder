import React from 'react'
import { dateUtil } from '../../utils'

const Weekday = () => {
  return (
    <section className="font-md mb-2 grid grid-cols-7 text-xs text-green-700 md:mt-3">
      {dateUtil.WEEK_DAYS.map((weekday, i) => (
        <div key={i} className="flex items-center justify-center">
          {weekday}
        </div>
      ))}
    </section>
  )
}

export default Weekday
