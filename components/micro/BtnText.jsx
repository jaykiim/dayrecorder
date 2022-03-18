import React from 'react'

const BtnText = ({ text, style, btnClick, type }) => {
  return (
    <button type={type} onClick={btnClick} className={style}>
      {text}
    </button>
  )
}

export default BtnText
