import React from 'react'
import ReactTooltip from 'react-tooltip'
import { AiFillDelete } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'

const BtnDelete = ({ name, cb, updating, setUpdating }) => {
  const cancel = updating.state && updating.name === name
  return (
    <div
      data-tip={cancel ? '' : '삭제'}
      className="rounded-md text-lg text-gray-400 hover:opacity-100"
    >
      <ReactTooltip backgroundColor="#da4343" />
      {cancel ? (
        <ImCancelCircle onClick={() => setUpdating({ name, state: false })} />
      ) : (
        <AiFillDelete onClick={() => cb(name)} />
      )}
    </div>
  )
}

export default BtnDelete
