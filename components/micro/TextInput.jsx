import React from 'react'

const TextInput = ({
  type,
  id,
  placeholder,
  values,
  handleChange,
  handleBlur,
}) => (
  <div className="flex">
    <label htmlFor={id} className="mr-4 font-bold">
      {id.toUpperCase()}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={values[id]}
      onChange={handleChange}
      onBlur={handleBlur}
      className="w-full bg-transparent lowercase focus:outline-none"
    />
  </div>
)

export default TextInput
