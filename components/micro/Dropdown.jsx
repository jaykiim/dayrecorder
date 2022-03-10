import React from 'react'
import { AiOutlineDownCircle } from 'react-icons/ai'

const Dropdown = ({
  id,
  open,
  setOpen,
  before,
  after,
  style,
  preview,
  contents,
  contentHeight,
  others,
}) => {
  return (
    <section
      className={`flex flex-col h-${after} rounded-md transition-all ${
        style?.container
      } ${open.state && open.id === id ? 'max-h-' + after : 'max-h-' + before}`}
    >
      <div
        onClick={() => setOpen({ id, state: !open.state })}
        className={`flex h-${before} cursor-pointer items-center px-2`}
      >
        <AiOutlineDownCircle className={style?.icon} />
        <span className={style?.title}>{preview}</span>
      </div>

      <div
        className={`${
          open.state && open.id === id
            ? `h-${contentHeight} overflow-y-auto border-t ${style?.underlineColor} p-2`
            : 'hidden'
        }`}
      >
        {contents}
      </div>

      {others}
    </section>
  )
}

export default Dropdown
