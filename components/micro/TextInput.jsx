import React from 'react'

const TextInput = ({
  type,
  id,
  placeholder,
  values,
  handleChange,
  handleBlur,
  styles,
}) => (
  <div className={styles?.container}>
    <label htmlFor={id} className={styles?.label}>
      {id.toUpperCase()}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={values[id]}
      onChange={handleChange}
      onBlur={handleBlur}
      className={styles?.input}
    />
  </div>
)

export default TextInput
