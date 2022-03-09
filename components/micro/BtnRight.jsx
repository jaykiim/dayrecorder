import React from 'react'
import { MdArrowForwardIos } from 'react-icons/md'

const BtnRight = ({ style }) => {
  return (
    <div className={style.container}>
      <MdArrowForwardIos className={style.icon} />
    </div>
  )
}

export default BtnRight
