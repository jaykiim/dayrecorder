import React from 'react'
import TextInput from '../micro/TextInput'
import ColorPicker from './ColorPicker'

const NewColor = (props) => {
  return (
    <>
      <ColorPicker flex={props.flex} />
      <div
        className={`flex flex-col gap-y-4 rounded-b-lg bg-green-900 p-5 text-sm text-green-500 ${
          props.flex && 'w-full rounded-b-none rounded-r-lg'
        }`}
      >
        <TextInput
          {...{
            ...props,
            type: 'text',
            id: 'hex',
            placeholder: '컬러를 선택하거나 입력하세요',
          }}
        />
        <TextInput
          {...{
            ...props,
            type: 'text',
            id: 'tag',
            placeholder: '컬러의 의미를 입력하세요 ex.휴식',
          }}
        />
      </div>
    </>
  )
}

export default NewColor