import React from 'react'
import { BsPencilSquare, BsCheckCircleFill } from 'react-icons/bs'

const BtnUpdate = ({ color, id, updating, setUpdating, cb }) => {
  return (
    <div className={`rounded-full text-lg text-gray-400 hover:bg-${color}`}>
      {updating.state && id === updating.id ? (
        <BsCheckCircleFill onClick={() => cb(id)} />
      ) : (
        <BsPencilSquare onClick={() => setUpdating({ id, state: true })} />
      )}
    </div>
  )
}

export default BtnUpdate
