import React, { useState } from 'react'
import { AiOutlineDownCircle } from 'react-icons/ai'

const Dropdown = ({
  children,
  style,
  preview,
  fullHeight,
  maxHeight,
  noArrow,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={style.container}
      style={{
        display: 'flex',
        flexDirection: 'column',

        height: fullHeight,
        maxHeight: open ? fullHeight : maxHeight,
        transition: 'all 200ms',
      }}
    >
      {/* ===========================================================================================================================
        // GUIDE 닫힘 
      =========================================================================================================================== */}

      <div onClick={() => setOpen(!open)} className={style.preview}>
        {!noArrow && <AiOutlineDownCircle className="mr-2 text-lg" />}
        <div
          className="flex flex-col justify-center"
          style={{ height: maxHeight }}
        >
          {preview}
        </div>
      </div>

      {/* ===========================================================================================================================
        // GUIDE 열림 
      =========================================================================================================================== */}

      <div
        className={style.open}
        style={{
          height: '100%',
          opacity: open ? '1' : '0',
          visibility: open ? 'visible' : 'hidden',
          transition: 'all 200ms',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Dropdown
