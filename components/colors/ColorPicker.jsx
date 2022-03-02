import React from 'react'
import { SliderPicker } from 'react-color'

const ColorPicker = ({ values, setValues, flex }) => {
  return (
    <div
      className={`bg-white p-5 md:bg-gray-50 ${
        flex ? 'w-96 overflow-hidden' : 'w-full rounded-t-lg'
      } `}
    >
      <SliderPicker
        color={values.hex}
        onChange={(color) => setValues({ ...values, hex: color.hex })}
        className={`w-full opacity-30`}
      />
    </div>
  )
}

export default ColorPicker
