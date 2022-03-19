import React from 'react'
import MainTap from '../components/container/MainTap'
import SideTap from '../components/container/SideTap'
import Statistics from '../components/statistics/Statistics'

const statistics = () => {
  return (
    <>
      <MainTap alone>
        <Statistics />
      </MainTap>
    </>
  )
}

statistics.auth = true
export default statistics
