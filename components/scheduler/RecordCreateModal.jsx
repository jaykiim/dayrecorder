import React, { useState } from 'react'
import { DEFAULT_COLOR } from '../../store/constants'
import { useRecorder } from '../../hooks/useRecorder'
import ColorDropdown from '../color2/ColorDropdown'

const RecordCreateModal = ({ setModal, startRecording }) => {
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

  const [selectedColor, setSelectedColor] = useState(null)

  return (
    <div className="absolute top-10 right-0 z-10 h-32 w-64 rounded-md border border-green-900 bg-green-300 p-5 shadow-md md:bg-gray-50">
      <div className="absolute z-30" style={{ width: 214 }}>
        <ColorDropdown
          style={dropdownStyle}
          defaultColor={
            selectedColor || {
              color: { hex: DEFAULT_COLOR.hex },
              tag: DEFAULT_COLOR.tag,
            }
          }
          handleColorClick={(colorInfo) => setSelectedColor(colorInfo)}
        />
      </div>

      <div className="absolute top-16" style={{ width: 214 }}>
        <input
          type="text"
          autoFocus={true}
          placeholder="타이틀 입력 후 Enter"
          className="w-full border-b border-green-900 bg-transparent pb-1 focus:border-b-2 focus:outline-none"
          onKeyPress={(e) =>
            e.key === 'Enter' &&
            startRecording(e, e.target.value, selectedColor, setModal)
          }
        />
      </div>
    </div>
  )
}

export default RecordCreateModal
