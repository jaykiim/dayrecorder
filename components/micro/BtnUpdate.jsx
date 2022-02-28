import React from 'react'
import { BsPencilSquare, BsCheckCircleFill } from 'react-icons/bs'

const BtnUpdate = ({ color, name, updating, setUpdating, cb }) => {
  return (
    <div className={`rounded-full text-lg text-gray-400 hover:bg-${color}`}>
      {updating.state && name === updating.name ? (
        <BsCheckCircleFill onClick={() => cb(name)} />
      ) : (
        <BsPencilSquare onClick={() => setUpdating({ name, state: true })} />
      )}
    </div>
  )
}

export default BtnUpdate
