import React from 'react'
import BtnDelete from './BtnDelete'
import BtnUpdate from './BtnUpdate'

const ModabbleItem = ({
  name,
  id,
  updating,
  setUpdating,
  handleDelete,
  handleUpdate,
  style,
}) => {
  return (
    <div className={'flex justify-between hover:bg-gray-100 ' + style}>
      {updating.state && updating.id === id ? (
        <input
          type="text"
          autoFocus={true}
          className="mr-4 w-full px-2 focus:outline-none"
        />
      ) : (
        <p className="w-full cursor-pointer">{name}</p>
      )}

      <div className="flex gap-x-2">
        <BtnUpdate
          id={id}
          cb={handleUpdate}
          updating={updating}
          setUpdating={setUpdating}
        />
        <BtnDelete
          id={id}
          cb={handleDelete}
          updating={updating}
          setUpdating={setUpdating}
        />
      </div>
    </div>
  )
}

export default ModabbleItem
