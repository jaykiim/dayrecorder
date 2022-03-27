import React from 'react'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'
import { dateUtil } from '../../utils'

const Header = ({ clickedDate, setClickedDate, toggle, setToggle }) => {
  const { year, date } = dateUtil.dateConverter({
    date: clickedDate,
    to: 'object',
  })

  const datestamp = dateUtil.dateConverter({
    date: clickedDate,
    to: 'yyyy-mm-dd',
  })

  const prev = () => {
    const month = clickedDate.getMonth()
    if (month < 1) setClickedDate(new Date(year - 1, 11, date))
    else setClickedDate(new Date(year, month - 1, date))
  }

  const next = () => {
    const month = clickedDate.getMonth()
    if (month > 10) setClickedDate(new Date(year + 1, 0, date))
    else setClickedDate(new Date(year, month + 1, date))
  }

  return (
    <header className="flex items-center px-5 md:px-2">
      <button
        onClick={prev}
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-green-500"
      >
        <MdArrowBackIosNew className="text-green-700" />
      </button>

      <h1
        onClick={() => setToggle(!toggle)}
        className="flex-1 cursor-pointer text-center text-lg font-black text-green-900"
      >
        {datestamp}
      </h1>

      <button
        onClick={next}
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-green-500"
      >
        <MdArrowForwardIos className="text-green-700" />
      </button>
    </header>
  )
}

export default Header
