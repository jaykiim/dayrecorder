import React from 'react'
import Dropdown from '../micro/Dropdown'

const TimeSelector = ({ options, optionNum, setOptionNum }) => {
  const dropdownStyle = {
    container:
      'border border-green-700 text-green-700 rounded-md px-2 cursor-pointer bg-gray-50 text-sm',
    preview: 'flex items-center font-bold',
  }

  return (
    <Dropdown
      style={dropdownStyle}
      fullHeight="136px"
      maxHeight="26px"
      preview={options[optionNum] + '분'}
    >
      {options.map((time, i) => (
        <div
          key={i}
          onClick={() => setOptionNum(i)}
          className="border-t border-green-500 hover:bg-green-300"
        >
          {time} 분
        </div>
      ))}
    </Dropdown>
  )
}

export default TimeSelector
