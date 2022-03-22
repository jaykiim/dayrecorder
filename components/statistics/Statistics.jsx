import React from 'react'
import Title from '../micro/Title'
import ByCategory from './ByCategory'

const Statistics = () => {
  return (
    <>
      <Title title="Statistics" />
      <section className="bodyContainer">
        <ByCategory />
      </section>
    </>
  )
}

export default Statistics
