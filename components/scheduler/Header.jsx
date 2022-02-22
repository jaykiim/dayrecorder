import React from 'react'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'
import { IoMdAdd } from 'react-icons/io'
import { useSetRecoilState } from 'recoil'
import { selectedDate } from '../../store/common'

const Header = ({ width, isWeek, setIsWeek }) => {
  const setSelectedDate = useSetRecoilState(selectedDate)
  return (
    <div className="flex">
      {width < 768 && <div className="flex-1" />}
      <div className="mx-3 flex gap-3 md:mx-0 md:flex-1">
        <section className="flex gap-x-1">
          <button className="btnGreen md:text-md text-xs">
            <MdArrowBackIosNew className="text-green-700" />
          </button>
          <button
            onClick={() => setSelectedDate(new Date())}
            className="btnGreen md:text-md text-xs font-semibold"
          >
            Today
          </button>
          <button className="btnGreen md:text-md text-xs">
            <MdArrowForwardIos className="text-green-700" />
          </button>
        </section>

        {width >= 1280 && (
          <section
            onClick={() => setIsWeek(!isWeek)}
            className="relative flex h-8 w-32 cursor-pointer items-center gap-2 rounded-md bg-green-300 p-1 font-semibold"
          >
            <div
              className={`${
                !isWeek && 'translate-x-16'
              } text-bold absolute top-1 h-6 w-14 rounded-md bg-white text-center font-bold text-carrot-light shadow-sm transition-all`}
            >
              {isWeek ? 'Day' : 'Week'}
            </div>
            <div className="flex-1 text-center">Day</div>
            <div className="flex-1 text-center">Week</div>
          </section>
        )}
      </div>

      <button className="flex items-center rounded-md bg-carrot-light p-1 px-4 text-white hover:bg-carrot-deep">
        <div className="mr-2 h-4 w-4 rounded-full bg-white">
          <IoMdAdd className="text-carrot-deep" />
        </div>
        <p className="md:text-md text-xs">Start {width > 768 && 'Recording'}</p>
      </button>
    </div>
  )
}

export default Header
