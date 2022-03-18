import React, { useState } from 'react'
import { AiOutlineDownCircle } from 'react-icons/ai'

const Dropdown2 = ({ children, style, preview, fullHeight, maxHeight }) => {
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
        <AiOutlineDownCircle className="mr-2 text-lg" />
        <p>{preview}</p>
      </div>

      {/* ===========================================================================================================================
        // GUIDE 열림 
      =========================================================================================================================== */}

      <div
        style={{
          height: '100%',
          opacity: open ? '1' : '0',
          visibility: open ? 'visible' : 'hidden',
          transition: 'all 200ms',
        }}
      >
        {React.cloneElement(children, { greeting: 'hello' })}
      </div>
    </div>
  )
}

export default Dropdown2
