import React from 'react'
import ReactTooltip from 'react-tooltip'
import { AiFillDelete } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'

const BtnDelete = ({ handleDelete, updating, setUpdating }) => {
  return (
    <div data-tip={updating ? '' : '삭제'}>
      <ReactTooltip backgroundColor="#da4343" />
      {updating ? (
        <ImCancelCircle onClick={() => setUpdating(false)} />
      ) : (
        <AiFillDelete onClick={handleDelete} />
      )}
    </div>
  )
}

export default BtnDelete
