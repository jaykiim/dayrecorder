import React, { useState } from 'react'
import CategoryCharts from './CategoryCharts'

const ByCategory = () => {
  const [selectedFilter, setSelectedFilter] = useState(0)

  const btnStyle = (num) =>
    `btnGreen ${selectedFilter === num && 'font-bold'} hover:bg-green-500`

  return (
    <>
      <div className="mx-2 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3 h-5 w-1 bg-green-700" />
          <h1 className="text-xl font-black capitalize text-green-500">
            daily records
          </h1>
        </div>

        <div className="flex gap-x-2 text-xs text-green-900">
          <button onClick={() => setSelectedFilter(0)} className={btnStyle(0)}>
            일간
          </button>
          <button onClick={() => setSelectedFilter(1)} className={btnStyle(1)}>
            주간
          </button>
          <button onClick={() => setSelectedFilter(2)} className={btnStyle(2)}>
            월간
          </button>
        </div>
      </div>

      <CategoryCharts selectedFilter={selectedFilter} />
    </>
  )
}

export default ByCategory
