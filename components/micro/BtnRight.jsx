import React from 'react'
import { MdArrowForwardIos } from 'react-icons/md'

const BtnRight = ({ btnClick, style }) => {
  return (
    <div onClick={btnClick} className={style.container}>
      <MdArrowForwardIos className={style.icon} />
    </div>
  )
}

export default BtnRight
