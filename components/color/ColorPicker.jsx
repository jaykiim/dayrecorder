import React from 'react'
import { SliderPicker } from 'react-color'

const ColorPicker = ({ values, setValues, flex }) => {
  return (
    <div className={`rounded-l-md border-y border-l border-green-700 p-5`}>
      <SliderPicker
        color={values.hex}
        onChange={(color) => setValues({ ...values, hex: color.hex })}
        className={`w-full opacity-30`}
      />
    </div>
  )
}

export default ColorPicker
