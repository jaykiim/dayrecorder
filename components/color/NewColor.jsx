import React from 'react'
import { useRecoilValue } from 'recoil'
import { currentCategory } from '../../store/common'
import Form from '../micro/Form'
import TextInput from '../micro/TextInput'
import ColorPicker from './ColorPicker'
import { colorValidate } from './utils'

const NewColor = () => {
  // hex 및 tag 입력창 데이터
  const initialValues = { hex: '', tag: '' }
  const styles = {
    container: 'flex items-center',
    label: 'text-xs text-gray-200 mr-2',
    input: 'rounded-sm text-sm w-full px-2 focus:outline-none',
  }

  const selectedCategory = useRecoilValue(currentCategory)
  const hexes = selectedCategory.userColors.map((color) => color.color.hex)
  const tags = selectedCategory.userColors.map((color) => color.tag)

  const renderNewColor = ({ values, setValues, handleChange, errors }) => (
    <>
      <section className="mt-5 flex">
        {/* ============================================================================================================================== 
        좌측: 컬러 픽커 
      ============================================================================================================================== */}

        <div className="flex-1">
          <ColorPicker values={values} setValues={setValues} />
        </div>

        {/* ============================================================================================================================== 
        우측: hex 및 tag 입력창 
      ============================================================================================================================== */}

        <div className="flex flex-1 flex-col justify-center gap-y-3 rounded-r-md bg-green-700 px-2">
          <TextInput
            type="text"
            id="hex"
            placeholder="hex 입력 또는 좌측에서 선택"
            values={values}
            handleChange={handleChange}
            styles={styles}
          />
          <TextInput
            type="text"
            id="tag"
            placeholder="컬러명을 입력하세요"
            values={values}
            handleChange={handleChange}
            styles={styles}
          />
        </div>
      </section>

      {/* ============================================================================================================================== 
        에러메세지
      ============================================================================================================================== */}

      <p className="alertTextSm mt-2">{errors.hex || errors.tag}</p>
    </>
  )

  return (
    <Form
      initialValues={initialValues}
      renderComponents={(props) => renderNewColor(props)}
      validate={() => colorValidate('new', tags, hexes)}
    />
  )
}

export default NewColor
