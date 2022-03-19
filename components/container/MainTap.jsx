import React from 'react'

const MainTap = ({ children, alone }) => {
  return (
    <section
      className={`flex flex-col overflow-hidden md:w-full md:rounded-2xl md:bg-white ${
        alone && 'ml-6'
      }`}
    >
      {children}
    </section>
  )
}

export default MainTap
