import React from 'react'

const ColorChip = ({ hex }) => {
  return (
    <div
      className="mr-2 h-4 w-4 rounded-full"
      style={{
        backgroundColor: hex + '4d',
      }}
    />
  )
}

export default ColorChip
