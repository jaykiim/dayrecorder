import React, { useState } from 'react'
import { useWindowSize } from 'react-use'
import Header from './Header'
import Bodies from './Bodies'
import Title from '../micro/Title'

const Scheduler = () => {
  // 화면 너비가 768보다 좁으면 Title을 숨김
  const { width } = useWindowSize()

  // 화면 너비가 1280보다 넓으면 주간 뷰를 기본으로 함
  const [isWeek, setIsWeek] = useState(width >= 1280 ? true : false)

  const [loading, setLoading] = useState(true)

  return (
    <>
      <Title title="scheduler" />
      {loading && <div className="absolute top-1/2 right-1/4">loading</div>}

      <section className="bodyContainer">
        <Header width={width} isWeek={isWeek} setIsWeek={setIsWeek} />
        <Bodies isWeek={isWeek} loading={loading} setLoading={setLoading} />
      </section>
    </>
  )
}

export default Scheduler
