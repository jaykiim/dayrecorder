import React from 'react'

const MainTap = ({ children }) => {
  return (
    <section className="flex flex-col md:w-full md:overflow-y-scroll md:rounded-2xl md:bg-white">
      {children}
    </section>
  )
}

export default MainTap
