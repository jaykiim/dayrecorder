import React, { useState } from 'react'
import ColorDropdown from '../micro/ColorDropdown'

const NewTodo = () => {
  const [color, setColor] = useState(null)

  const dropdownStyle = {
    container:
      'rounded-lg border border-green-500 text-green-900 mb-4 bg-transparent',
    preview:
      'flex cursor-pointer items-center px-2 border-green-900 font-bold text-sm',
    open: 'overflow-y-auto',
  }

  const handleSubmit = (e) => {
    const value = e.target.value

    if (!value.replace(/\s+/g, '')) return
  }

  return (
    <div className="mb-6 border-b border-dashed pb-6">
      <ColorDropdown color={color} setColor={setColor} style={dropdownStyle} />
      <input
        type="text"
        placeholder="할 일을 입력 후 Enter 로 등록하세요"
        className="inputBorder rounded-lg border-green-700 p-2"
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
      />
    </div>
  )
}

export default NewTodo
