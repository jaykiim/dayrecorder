import React from 'react'
import { AiOutlineDownCircle } from 'react-icons/ai'

const Dropdown = ({
  id,
  open,
  setOpen,
  header,
  cb,
  origin,
  stretched,
  style,
}) => {
  return (
    <div
      id="ColorDropdownSublist"
      className={`h-${stretched} ${style.common} transition-all ${
        id === open.id && open.state
          ? `max-h-${stretched} ${style.open}`
          : `max-h-${origin}`
      } ${!open && style.notOpen}`}
    >
      <div className="flex items-center justify-between">
        <span className={style.listItem}>{header}</span>
        <AiOutlineDownCircle
          onClick={() => setOpen({ id, state: !open.state })}
          className="cursor-pointer text-xl text-gray-400"
        />
      </div>

      {id === open.id && open.state && cb(id)}
    </div>
  )
}

export default Dropdown
