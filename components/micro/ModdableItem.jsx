import React from 'react'
import BtnDelete from './BtnDelete'
import BtnUpdate from './BtnUpdate'

const ModdableItem = ({
  children,
  updating,
  setUpdating,
  style,
  handleDelete,
}) => {
  return (
    <div className={style}>
      {children}

      <div className="flex cursor-pointer items-center gap-x-2">
        {!updating && (
          <BtnUpdate updating={updating} setUpdating={setUpdating} />
        )}
        <BtnDelete
          updating={updating}
          setUpdating={setUpdating}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  )
}

export default ModdableItem
