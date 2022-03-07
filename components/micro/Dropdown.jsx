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
      className={`flex flex-col h-${after} rounded-md transition-all ${style} ${
        open.state && open.id === id ? 'max-h-' + after : 'max-h-' + before
      }`}
    >
      <div
        onClick={() => setOpen({ id, state: !open.state })}
        className={`flex h-${before} cursor-pointer items-center px-2`}
      >
        <AiOutlineDownCircle className="mr-2 text-xl text-gray-400" />
        <span className="text-sm">{preview}</span>
      </div>

      <div
        className={`${
          open.state && open.id === id
            ? `h-${contentHeight} overflow-y-auto border-t p-2`
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
