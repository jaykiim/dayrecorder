import React from 'react'
import { AiOutlineDownCircle } from 'react-icons/ai'

const Dropdown = ({ open, setOpen, header, cb, origin, stretched, style }) => {
  return (
    <div
      className={`max-h-${origin} h-${stretched} py-2 px-3 transition-all  ${
        open && `max-h-${stretched} ${style.open}`
      } ${style.common} ${!open && style.notOpen}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-bold">{header}</span>
        <AiOutlineDownCircle
          onClick={() => setOpen(!open)}
          className="cursor-pointer text-xl text-gray-400"
        />
      </div>

      {open && cb()}
    </div>
  )
}

export default Dropdown
