import React from 'react'

const BtnText = ({ text, style, btnClick }) => {
  return (
    <button onClick={btnClick} className={style.container}>
      {text}
    </button>
  )
}

export default BtnText
