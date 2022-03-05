import React from 'react'
import { IoMdAdd, IoStopCircleOutline } from 'react-icons/io'

const RecordStarter = ({ label, cb }) => {
  return (
    <button
      onClick={cb}
      className="relative flex items-center rounded-md bg-carrot-light p-1 px-4 text-white hover:bg-carrot-deep"
    >
      <div className="mr-2 h-4 w-4 rounded-full bg-white">
        <IoMdAdd className="text-carrot-deep" />
      </div>
      <p className="md:text-md text-xs">
        {label === 'start' ? 'Start' : 'Stop'}
      </p>
    </button>
  )
}

export default RecordStarter
