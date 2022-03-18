import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import {
  deleteUserCategoryReq,
  updateUserCategoryNameReq,
} from '../../apiCalls/colorCalls'
import { currentCategory } from '../../store/common'
import Dropdown from '../micro/Dropdown'
import ModabbleItem from '../micro/ModabbleItem'
import NewCategory from './NewCategory'
import { categoryNameValidate } from './utils'

const CategoryDropdown = ({ categories, setCategories }) => {
  const email = useSession().data.user.email

  // * 현재 카테고리
  const [selectedCategory, setSelectedCategoryId] = useRecoilState(
    currentCategory(email)
  )

  // * 카테고리 드롭다운 열림/닫힘
  const [open, setOpen] = useState(false)

  // * 카테고리 수정 상태
  const [updating, setUpdating] = useState({ id: '', state: false })

  // * 카테고리 수정 콜백
  const handleUpdate = async (values, _, id) => {
    const { value } = values
    await updateUserCategoryNameReq(value, id)

    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, categoryName: value } : category
    )

    setCategories(updatedCategories)
    setUpdating({ id: '', state: false })
  }

  // * 카테고리 삭제 콜백
  const handleDelete = async (id) => {
    const newCategories = categories.filter((category) => category.id !== id)
    setCategories(newCategories)

    await deleteUserCategoryReq(id)
  }

  // * 카테고리 아이템 클릭 ( ==> 현재 선택된 카테고리 변경 )
  const handleListItemClick = (categoryId) => {
    setSelectedCategoryId(categoryId)
    setOpen(false)
  }

  // * 유효성 검사 재료
  const existingNames = categories.map((category) => category.categoryName)
  const validate = categoryNameValidate({ notOneOf: existingNames })

  // * 수정 필드
  const editFields = [
    {
      name: 'value',
      type: 'text',
      autoFocus: true,
      className:
        'px-1 bg-transparent border-b border-green-700 focus:outline-none',
    },
  ]

  // 개별 카테고리 아이템 스타일
  const itemStyle = {
    container: 'text-sm p-2 hover:bg-gray-50', // 개별 카테고리 div
    displayName: 'w-full cursor-pointer text-green-900', // 카테고리명 p
  }

  // 드롭다운 스타일
  const dropdownStyle = {
    container: 'border border-green-700',
    icon: 'text-green-900',
  }

  // 드롭다운 프리뷰
  const renderPreview = () => (
    <p className="ml-2 text-sm text-green-900">
      {selectedCategory?.categoryName || categories[0].categoryName}
    </p>
  )

  // 카테고리 리스트 아이템 렌더
  const renderList = () =>
    categories.map((category, i) => (
      <ModabbleItem
        key={i}
        id={category.id}
        displayName={category.categoryName}
        updating={updating}
        setUpdating={setUpdating}
        editFields={editFields}
        fieldDefaultVal={{ value: category.categoryName }}
        // validate={validate}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleListItemClick={handleListItemClick}
        useUpdateSubmitBtn={false}
        style={itemStyle}
      />
    ))

  // 새 카테고리 생성창 렌더
  const renderInput = () => (
    <NewCategory
      open={open}
      categories={categories}
      setCategories={setCategories}
    />
  )

  return (
    <Dropdown
      id=""
      open={open}
      setOpen={setOpen}
      before="8"
      after="64"
      preview={renderPreview()}
      contents={renderList()}
      contentHeight="40"
      others={renderInput()}
      style={dropdownStyle}
    />
  )
}

export default CategoryDropdown
