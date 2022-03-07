import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import {
  deleteUserCategoryReq,
  updateUserCategoryNameReq,
} from '../../apiCalls/colorCalls'
import { categoriesData } from '../../store/common'
import Dropdown from '../micro/Dropdown'
import ModabbleItem from '../micro/ModabbleItem'
import NewCategory from './NewCategory'

const CategoryDropdown = () => {
  // Color 컴포넌트에서 데이터 패칭되는 동안에는 Loading창 나오고 await 다 되면 재렌더 될 것임
  const [categories, setCategories] = useRecoilState(categoriesData)

  // 카테고리 드롭다운 메뉴 열림 상태
  const [open, setOpen] = useState(false)

  // 카테고리 아이템 수정 상태
  const [updating, setUpdating] = useState({ id: '', state: false })

  // 카테고리 리스트 이름 수정 후 엔터 치면 아래 콜백 실행
  const handleUpdate = async (values, _, id) => {
    const { value } = values
    await updateUserCategoryNameReq(value, id)

    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, categoryName: value } : category
    )

    setCategories(updatedCategories)
    setUpdating({ id: '', state: false })
  }

  // 카테고리 리스트 아이템 삭제 콜백
  const handleDelete = async (id) => {
    const newCategories = categories.filter((category) => category.id !== id)
    setCategories(newCategories)

    await deleteUserCategoryReq(id)
  }

  // 카테고리 이름 수정 시 기존에 존재하는 카테고리명과 중복될 수 없도록 유효성 검사할 떄 쓸 배열
  const existingNames = categories.map((category) => category.categoryName)

  // 카테고리 리스트 아이템 렌더
  const renderList = () =>
    categories.map((category, i) => (
      <ModabbleItem
        key={i}
        id={category.id}
        name={category.categoryName}
        updating={updating}
        setUpdating={setUpdating}
        validationProps={{ notOneOf: existingNames }}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        useUpdateSubmitBtn={false}
        style="text-sm p-2"
      />
    ))

  // 새 카테고리 생성창 렌더
  const renderInput = () => <NewCategory open={open} />

  return (
    <>
      {categories.length ? (
        <Dropdown
          id=""
          open={open}
          setOpen={setOpen}
          before="8"
          after="64"
          preview={categories[0].categoryName || '카테고리를 생성하세요'}
          contents={renderList()}
          contentHeight="40"
          others={renderInput()}
          style="bg-gray-50"
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}

export default CategoryDropdown
