import React from 'react'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'
import { dateObj } from './utils'

const Header = ({ date, setDate, toggle, setToggle }) => {
  let { year, month, day } = dateObj(date)
  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day

  const prev = () => {
    const month = date.getMonth()
    if (month < 1) setDate(new Date(year - 1, 11, day))
    else setDate(new Date(year, month - 1, day))
  }

  const next = () => {
    const month = date.getMonth()
    if (month > 10) setDate(new Date(year + 1, 0, day))
    else setDate(new Date(year, month + 1, day))
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
        {year}-{month}-{day}
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
