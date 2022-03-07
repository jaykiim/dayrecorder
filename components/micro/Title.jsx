import React from 'react'
import { useWindowSize } from 'react-use'
import { MEDIUM } from '../../store/constants'

const Title = ({ title }) => {
  const { width } = useWindowSize()
  return (
    <h1
      className={`${
        width < MEDIUM && 'hidden'
      } border-b border-green-300 p-4 px-5 text-xl font-black uppercase text-green-900`}
    >
      {title}
    </h1>
  )
}

export default Title
