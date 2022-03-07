import React from 'react'
import * as Yup from 'yup'
import { createUserCategoryReq } from '../../apiCalls/colorCalls'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { categoriesData } from '../../store/common'
import Form from '../micro/Form'

const NewCategory = ({ open }) => {
  const email = useSession().data.user.email

  const [categories, setCategories] = useRecoilState(categoriesData)

  // 새 카테고리명이 기존 카테고리명과 중복되지 않도록, 기존 카테고리명 배열을 생성해서 validate에서 사용
  const names = categories.map((category) => category.categoryName)

  // onSubmit 콜백 (새 카테고리 생성)
  const createNewCategory = async (values, tools) => {
    const { setValues } = tools

    // 공백만 있을 경우 리턴
    if (!values.newCategory.replace(/\s+/g, '')) return

    // db 등록 및 등록된 새 카테고리 객체 받아오기
    const createdCategory = await createUserCategoryReq(
      values.newCategory,
      email
    )

    // 입력값 지우기
    setValues({ ...values, newCategory: '' })

    // 전역 상태 변경
    setCategories([...categories, createdCategory])
  }

  // 카테고리 입력값 유효성 검사
  const validate = Yup.object({
    newCategory: Yup.string()
      .required('카테고리명을 입력하세요')
      .notOneOf(names, '이미 존재하는 카테고리입니다'),
  })

  const fields = [
    {
      name: 'newCategory',
      type: 'text',
      placeholder: '카테고리명 입력 후 Enter키로 등록',
      className: 'w-full rounded-md p-1 px-2 text-sm focus:outline-none',
    },
  ]

  return (
    <Form
      initialValues={{ newCategory: '' }}
      validate={validate}
      onSubmit={createNewCategory}
      formStyle={`${
        open.state ? 'h-16 flex-col justify-center bg-green-700 p-2' : 'hidden'
      }`}
      alertStyle="ml-1 mt-1 text-xs text-gray-200"
      fields={fields}
    />
  )
}

export default NewCategory
