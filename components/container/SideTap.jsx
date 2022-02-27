import React from 'react'

const SideTap = ({ children }) => {
  return (
    <section className="md:w-2/3 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
      <div className="flex flex-col items-center p-4">{children}</div>
    </section>
  )
}

export default SideTap
