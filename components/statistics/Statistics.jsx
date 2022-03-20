import React from 'react'
import Title from '../micro/Title'
import PerCategory from './PerCategory'

const Statistics = () => {
  return (
    <>
      <Title title="Statistics" />
      <section className="bodyContainer">
        <PerCategory />
      </section>
    </>
  )
}

export default Statistics
