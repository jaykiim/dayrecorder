import React, { useState } from 'react'
import ColorDropdown from '../colors/ColorDropdown'
import { DEFAULT_COLOR } from '../../store/constants'

const StartModal = ({ setModal, startRecording }) => {
  const [color, setColor] = useState(DEFAULT_COLOR)
  const [title, setTitle] = useState('')

  return (
    <form
      onKeyDown={(e) =>
        e.key === 'Enter' && startRecording(e, title, color, setModal)
      }
      className="absolute right-5 top-12 z-10 h-24 w-52 rounded-lg bg-white p-2 shadow-md"
    >
      <div className="absolute top-2 z-30 w-48">
        <ColorDropdown color={color} setColor={setColor} />
      </div>
      <input
        type="text"
        placeholder="Enter로 시간 기록 시작"
        autoFocus={true}
        className="absolute bottom-2 w-48 rounded-md border px-2 py-1 focus:border-2 focus:border-green-700 focus:outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  )
}

export default StartModal
