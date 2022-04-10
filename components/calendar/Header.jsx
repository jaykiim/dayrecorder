import React from 'react'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'
import { dateUtil } from '../../utils'

const Header = ({ clickedDate, setClickedDate, toggle, setToggle }) => {
  // 현재 선택된 연도 및 날짜
  const { year, date } = dateUtil.dateConverter({
    date: clickedDate,
    to: 'object',
  })

  // 현재 선택된 날짜 스탬프
  const datestamp = dateUtil.dateConverter({
    date: clickedDate,
    to: 'yyyy-mm-dd',
  })

  // 이전 달 버튼 클릭
  const prev = () => {
    const month = clickedDate.getMonth()
    if (month < 1) setClickedDate(new Date(year - 1, 11, date))
    else setClickedDate(new Date(year, month - 1, date))
  }

  // 다음 달 버튼 클릭
  const next = () => {
    const month = clickedDate.getMonth()
    if (month > 10) setClickedDate(new Date(year + 1, 0, date))
    else setClickedDate(new Date(year, month + 1, date))
  }

  return (
    <header className="flex items-center px-5 md:px-2">
      {/* GUIDE 이전 달 =================================================================================================================  */}

      <button
        onClick={prev}
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-green-500"
      >
        <MdArrowBackIosNew className="text-green-700" />
      </button>

      {/* GUIDE 날짜 스탬프 ============================================================================================================== */}

      <h1
        onClick={() => setToggle(!toggle)}
        className="flex-1 cursor-pointer text-center text-lg font-black text-green-900"
      >
        {datestamp}
      </h1>

      {/* GUIDE 다음 달 =================================================================================================================  */}

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
