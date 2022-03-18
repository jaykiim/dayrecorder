import React from 'react'
import BtnDelete from './BtnDelete'
import BtnUpdate from './BtnUpdate'
import Form from './Form'

const ModabbleItem = ({
  displayName,
  id,
  updating,
  setUpdating,
  validate,
  handleDelete,
  handleUpdate,
  handleListItemClick,
  submitProps,
  useUpdateSubmitBtn,
  editFields,
  fieldDefaultVal,
  style,
}) => {
  const initialValues = editFields.reduce((a, c) => {
    a[c.name] = fieldDefaultVal[c.name]
    return a
  }, {})

  return (
    <div className={'flex justify-between rounded-md ' + style?.container}>
      {updating.state && updating.id === id ? (
        <Form
          initialValues={initialValues}
          validate={validate}
          fields={editFields}
          onSubmit={handleUpdate}
          submitProps={id}
          itemId={submitProps || id}
          onItemClick={handleListItemClick}
          alertStyle="alertTextSm mt-1"
          formStyle={style?.formStyle}
        />
      ) : (
        <p
          onClick={() => handleListItemClick(id)}
          className={style?.displayName}
        >
          {displayName}
        </p>
      )}

      <div className="flex items-center gap-x-2">
        <BtnUpdate
          id={id}
          cb={handleUpdate}
          updating={updating}
          setUpdating={setUpdating}
          updateSubmitBtn={useUpdateSubmitBtn}
        />
        <BtnDelete
          id={id}
          cb={() => handleDelete(id)}
          updating={updating}
          setUpdating={setUpdating}
        />
      </div>
    </div>
  )
}

export default ModabbleItem
