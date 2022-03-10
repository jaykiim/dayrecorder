import React from 'react'
import ColorDropdown from '../color/ColorDropdown'

const RecordCreateModal = () => {
  const dropdownStyle = {
    outside: {
      container: 'bg-green-300 md:bg-gray-50 border border-green-900',
      icon: 'mr-2 text-xl text-green-900',
      title: 'text-sm text-green-900',
      underlineColor: 'border-green-900',
    },
    inside: {
      icon: 'mr-2 text-green-900',
      title: 'text-sm text-green-900',
    },
  }

  return (
    <div className="absolute top-10 right-0 z-10 h-32 w-64 rounded-md border border-green-900 bg-green-300 p-5 shadow-md md:bg-gray-50">
      <div className="absolute z-30" style={{ width: 214 }}>
        <ColorDropdown style={dropdownStyle} />
      </div>

      <div className="absolute top-16" style={{ width: 214 }}>
        <input
          type="text"
          autoFocus={true}
          placeholder="타이틀 입력 후 Enter"
          className="w-full border-b border-green-900 bg-transparent pb-1 focus:border-b-2 focus:outline-none"
        />
      </div>
    </div>
  )
}

export default RecordCreateModal
