import React from 'react'

const BtnText = ({ text, style, btnClick }) => {
  return (
    <button onClick={btnClick} className={style}>
      {text}
    </button>
  )
}

export default BtnText
