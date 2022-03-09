import React from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'

const BtnLeft = ({ style }) => {
  return (
    <div className={style.container}>
      <MdArrowBackIosNew className={style.icon} />
    </div>
  )
}

export default BtnLeft
