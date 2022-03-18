import React from 'react'
import { useSession } from 'next-auth/react'
import { useRecoilValue } from 'recoil'
import { createUserColorReq } from '../../apiCalls/colorCalls'
import { currentCategoryHexTag, currentCategoryId } from '../../store/common'
import { colorValidate } from './utils'
import Form from '../micro/Form'
import TextInput from '../micro/TextInput'
import ColorPicker from './ColorPicker'

const NewColor = ({ categories, setCategories }) => {
  // 사용자가 hex, tag 입력 후 엔터 시 실행되는 콜백에서 서버에 요청을 보낼건데 user 이메일이랑 categoryId 보내야함
  const email = useSession().data.user.email
  const categoryId = useRecoilValue(currentCategoryId)
  console.log('categoryId', categoryId)

  // hex 및 tag 입력창 데이터
  const initialValues = { hex: '', tag: '' }
  const styles = {
    container: 'flex items-center',
    label: 'text-xs text-gray-200 mr-2',
    input: 'rounded-sm text-sm w-full px-2 focus:outline-none',
  }

  // 카테고리에 이미 존재하는 요소와 중복되지 않도록,
  // 현재 카테고리 내에 기존에 저장되있던 아이템 객체 배열에서 hex만 뽑은 배열, tag만 뽑은 배열을 가져와서 validation에서 이용
  const hexesTags = useRecoilValue(currentCategoryHexTag(email))

  // 색상 등록 콜백
  const submitColor = async (values, { setValues }) => {
    // 서버에 요청
    const updatedCategory = await createUserColorReq({
      hex: values.hex,
      tag: values.tag,
      email,
      categoryId,
    })

    // 입력값 초기화
    setValues({ hex: '', tag: '' })

    // 기존 categories 배열에서 지금 선택된 카테고리를 찾아서 업데이트
    const newCategories = categories.map((category) =>
      category.id === categoryId ? updatedCategory : category
    )
    setCategories(newCategories)
  }

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
        메세지
      ============================================================================================================================== */}

      <p className="reference">
        * 실제 화면에 표시될 색상과 동일합니다 (투명도가 적용되어있음)
      </p>
      <p className="alertTextSm mt-2">{errors.hex || errors.tag}</p>
    </>
  )

  return (
    <>
      <Form
        initialValues={initialValues}
        renderComponents={(props) => renderNewColor(props)}
        validate={colorValidate('new', hexesTags[1], hexesTags[0])}
        onSubmit={submitColor}
      />
    </>
  )
}

export default NewColor
