import { useSession } from 'next-auth/react'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { createUserColorReq } from '../../apiCalls/colorCalls'
import {
  categoriesData,
  currentCategoryHexTag,
  currentCategoryId,
} from '../../store/common'
import Form from '../micro/Form'
import TextInput from '../micro/TextInput'
import ColorPicker from './ColorPicker'
import { colorValidate } from './utils'

const NewColor = () => {
  // 사용자가 hex, tag 입력 후 엔터 시 실행되는 콜백에서 서버에 요청을 보낼건데 user 이메일이랑 categoryId 보내야함
  const user = useSession().data.user
  const categoryId = useRecoilValue(currentCategoryId)

  // 컬러 생성 요청 보내고나면 그 결과로 업데이트된 현재 카테고리 객체를 응답으로 받으므로, 해당 데이터로 전역 상태를 업데이트시킨다
  const [categories, setCategories] = useRecoilState(categoriesData)

  // hex 및 tag 입력창 데이터
  const initialValues = { hex: '', tag: '' }
  const styles = {
    container: 'flex items-center',
    label: 'text-xs text-gray-200 mr-2',
    input: 'rounded-sm text-sm w-full px-2 focus:outline-none',
  }

  // 카테고리에 이미 존재하는 요소와 중복되지 않도록,
  // 현재 카테고리 내에 기존에 저장되있던 아이템 객체 배열에서 hex만 뽑은 배열, tag만 뽑은 배열을 가져와서 validation에서 이용
  const hexesTags = useRecoilValue(currentCategoryHexTag)

  // 색상 등록 콜백
  const submitColor = async (values, { setValues }) => {
    // 서버에 요청
    const { userCategory: updatedCategory } = await createUserColorReq({
      hex: values.hex,
      tag: values.tag,
      email: user.email,
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
      {hexesTags && (
        <Form
          initialValues={initialValues}
          renderComponents={(props) => renderNewColor(props)}
          validate={colorValidate('new', hexesTags[1], hexesTags[0])}
          onSubmit={submitColor}
        />
      )}
    </>
  )
}

export default NewColor
