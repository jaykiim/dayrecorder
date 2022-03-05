import React from 'react'

const ColorChip = ({ cb, colorInfo }) => {
  return (
    <div
      onClick={cb}
      className="flex cursor-pointer items-center rounded-lg py-2 px-1 text-sm hover:bg-gray-100"
    >
      <div
        className="mr-2 h-4 w-4 rounded-full"
        style={{ backgroundColor: colorInfo.hex + '80' }}
      />
      {colorInfo.tag}
    </div>
  )
}

export default ColorChip
