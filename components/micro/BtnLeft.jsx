import React from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'

const BtnLeft = ({ btnClick, style }) => {
  return (
    <div onClick={btnClick} className={style.container}>
      <MdArrowBackIosNew className={style.icon} />
    </div>
  )
}

export default BtnLeft
