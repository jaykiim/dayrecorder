import React, { useState } from 'react'
import * as Yup from 'yup'
import BtnDelete from './BtnDelete'
import BtnUpdate from './BtnUpdate'
import Form from './Form'

const ModabbleItem = ({
  name,
  id,
  updating,
  setUpdating,
  validationProps,
  handleDelete,
  handleUpdate,
  useUpdateSubmitBtn,
  style,
}) => {
  const initialValues = { value: name }

  const validate = Yup.object({
    value: Yup.string()
      .required('카테고리명을 입력하세요')
      .notOneOf(validationProps.notOneOf, '이미 존재하는 카테고리명입니다'),
  })

  const fields = [
    {
      name: 'value',
      type: 'text',
      autoFocus: true,
      className: 'px-2 focus:outline-none',
    },
  ]

  return (
    <div className={'flex justify-between hover:bg-gray-100 ' + style}>
      {updating.state && updating.id === id ? (
        <Form
          initialValues={initialValues}
          validate={validate}
          fields={fields}
          onSubmit={handleUpdate}
          submitProps={id}
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
