import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const Password = ({
  inputRef,
  error,
  inputId,
  value,
  handleChange,
  handleBlur,
  placeholder,
}) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type={visible ? 'text' : 'password'}
        id={inputId}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`w-full rounded-md border bg-transparent p-3 text-xl focus:outline-none ${
          error && 'border-carrot-deep'
        }`}
      />
      {visible ? (
        <AiFillEyeInvisible
          onClick={() => setVisible(false)}
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl text-gray-500"
        />
      ) : (
        <AiFillEye
          onClick={() => setVisible(true)}
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl text-gray-500"
        />
      )}
    </div>
  )
}

export default Password
