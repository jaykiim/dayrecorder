import React from 'react'
import Form2 from '../micro/Form2'

const CategoryForm = ({
  defaultValue,
  validate,
  style,
  handleSubmit,
  placeholder,
}) => {
  return (
    <Form2
      values={{ categoryName: defaultValue }}
      validate={validate}
      style={style}
      handleSubmit={handleSubmit}
    >
      {({ handleChange, values, errors }) => (
        <>
          <input
            type="text"
            id="categoryName"
            autoFocus={true}
            className="w-full border-b border-green-500 bg-transparent focus:outline-none"
            value={values.categoryName}
            onChange={handleChange}
            placeholder={placeholder}
          />
          <p className="alertTextSm absolute">{errors.categoryName}</p>
        </>
      )}
    </Form2>
  )
}

export default CategoryForm
