import React from 'react'
import { BsPencilSquare, BsCheckCircleFill } from 'react-icons/bs'

const BtnUpdate = ({ updating, setUpdating, handleSubmit, style }) => {
  return (
    <div className={style}>
      {updating ? (
        <BsCheckCircleFill onClick={handleSubmit} />
      ) : (
        <BsPencilSquare onClick={() => setUpdating(!updating)} />
      )}
    </div>
  )
}

export default BtnUpdate
