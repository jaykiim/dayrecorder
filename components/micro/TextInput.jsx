import React from 'react'

const TextInput = ({ id, placeholder, value, handleChange, style }) => (
  <div className={style?.container}>
    <label htmlFor={id} className={style?.label}>
      {id.toUpperCase()}
    </label>
    <input
      type="text"
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={style?.input}
    />
  </div>
)

export default TextInput
