import React from 'react'
import { useRecoilValue } from 'recoil'
import { createUserColorReq } from '../../apiCalls/colorCalls'
import { currentCategoryId } from '../../store/common'
import { validate } from '../../utils'
import Form from '../micro/Form'
import ColorPicker from './ColorPicker'

const ColorForm = ({ email, categories, setCategories }) => {
  console.log('ColorForm')

  const selectedCategoryId =
    useRecoilValue(currentCategoryId) || categories[1].id

  const fields = [
    { id: 'hex', placeholder: '직접 입력 or 왼쪽에서 선택' },
    { id: 'tag', placeholder: '컬러명 입력 후 엔터' },
  ]

  const handleSubmit = async (values) => {
    const { hex, tag } = values

    if (!tag.replace(/\s+/g, '')) return

    const updatedCategory = await createUserColorReq({
      hex,
      tag,
      email,
      categoryId: selectedCategoryId,
    })

    const newCategories = categories.map((item) =>
      item.id === selectedCategoryId ? updatedCategory.userCategory : item
    )

    setCategories(newCategories)
  }

  return (
    <Form
      values={{ hex: '', tag: '' }}
      validate={validate.color('hex', 'tag')}
      handleSubmit={handleSubmit}
    >
      {({ values, setValues, handleChange, errors, handleSubmit }) => (
        <>
          <div className="flex">
            <ColorPicker values={values} setValues={setValues} />

            <div className="flex w-full flex-col justify-center gap-y-2 rounded-r-md border border-green-700  p-2 text-green-900">
              {fields.map(({ id, placeholder }, i) => (
                <div key={i} className="flex items-center">
                  <label htmlFor={id} className="mr-2 text-sm uppercase">
                    {id}
                  </label>
                  <input
                    id={id}
                    type="text"
                    className="inputUnderline border-green-700 text-sm"
                    placeholder={placeholder}
                    value={values[id]}
                    onChange={handleChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  />
                </div>
              ))}
            </div>
          </div>
          <p className="reference">* 실제 화면에 표시될 색상과 동일합니다</p>
          <p className="alertTextSm mt-2">{errors.hex || errors.tag}</p>
        </>
      )}
    </Form>
  )
}

export default ColorForm
