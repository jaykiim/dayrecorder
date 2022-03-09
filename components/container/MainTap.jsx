import React from 'react'

const MainTap = ({ children }) => {
  return (
    <section className="flex flex-col overflow-hidden md:w-full  md:rounded-2xl md:bg-white">
      {children}
    </section>
  )
}

export default MainTap
