import React from 'react'
import ReactTooltip from 'react-tooltip'
import { AiFillDelete } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'

const BtnDelete = ({ id, cb, updating, setUpdating }) => {
  const cancel = updating.state && updating.id === id
  return (
    <div
      data-tip={cancel ? '' : '삭제'}
      className="cursor-pointer rounded-md text-lg text-green-700 hover:opacity-100"
    >
      <ReactTooltip backgroundColor="#da4343" />
      {cancel ? (
        <ImCancelCircle onClick={() => setUpdating({ id, state: false })} />
      ) : (
        <AiFillDelete onClick={() => cb(id)} />
      )}
    </div>
  )
}

export default BtnDelete
