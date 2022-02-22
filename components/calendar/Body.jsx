import React from 'react'
import { dateObj, getMonthlyDate, WEEK_DAYS_EN } from './utils'

const Body = ({ date, setDate }) => {
  const { year, month, day: clickedDate } = dateObj(date, 'en')
  const dates = getMonthlyDate(year, month)
  const today = new Date().getDate()

  const onClickDate = (parseDate) => {
    if (parseDate[0] === 'prev') {
      if (+month < 2) setDate(new Date(year - 2, 11, parseDate[1]))
      else setDate(new Date(year, month - 2, parseDate[1]))
    } else if (parseDate[0] === 'next') {
      if (month > 11) setDate(new Date(year + 1, 0, parseDate[1]))
      else setDate(new Date(year, month, parseDate[1]))
    } else setDate(new Date(year, month - 1, parseDate[0]))
  }

  return (
    <div className="pt-4 transition-all">
      <section className="font-md mb-2 grid grid-cols-7 text-xs text-green-700 md:mt-3">
        {WEEK_DAYS_EN.map((weekday, i) => (
          <div key={i} className="flex items-center justify-center">
            {weekday}
          </div>
        ))}
      </section>

      <section className="grid grid-cols-7">
        {dates.map((date, i) => {
          // date : "prev.31" 또는 "next.1" 또는 숫자
          let parseDate = date.toString().split('.')
          return (
            <div
              key={i}
              className={`flex h-9 items-center justify-center text-xs ${
                date === today && 'rounded-full bg-green-700 text-white'
              } ${
                date === clickedDate &&
                date !== today &&
                'rounded-full bg-green-500 text-white'
              }`}
              style={{
                color: parseDate[1] && '#AAC7C9',
              }}
              onClick={() => onClickDate(parseDate)}
            >
              {parseDate[1] || parseDate[0]}
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default Body
