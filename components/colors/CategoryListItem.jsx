import React, { useState } from 'react'
import { colorCalls } from '../../apiCalls'
import ModdableItem from '../micro/ModdableItem'
import CategoryForm from './CategoryForm'

const CategoryListItem = ({
  category,
  categories,
  setCategories,
  selectedCategoryId,
  setSelectedCategoryId,
  validate,
}) => {
  const [updating, setUpdating] = useState(false)

  const handleUpdate = async (values) => {
    const { updatedCategory } = await colorCalls.updateUserCategoryNameReq({
      categoryName: values.categoryName,
      id: category.id,
    })

    const newCategories = categories.map((item) =>
      item.id === category.id ? updatedCategory : item
    )
    setCategories(newCategories)

    setUpdating(false)
  }

  const handleDelete = async () => {
    await colorCalls.deleteManyUserColorReq({ id: category.id }) // 카테고리 내 컬러 삭제
    await colorCalls.deleteUserCategoryReq({ id: category.id })

    const newCategories = categories.filter((item) => item.id !== category.id)

    // 만약 현재 선택된 카테고리를 삭제한 경우 선택된 카테고리를 바꾼다
    if (category.id === selectedCategoryId)
      setSelectedCategoryId(categories[1].id)

    setCategories(newCategories)
  }

  if (category.categoryName === '미분류') return <div />

  return (
    <ModdableItem
      style="flex cursor-pointer items-center p-1 text-sm hover:bg-gray-50"
      updating={updating}
      setUpdating={setUpdating}
      handleDelete={handleDelete}
    >
      <>
        {updating ? (
          <CategoryForm
            defaultValue={category.categoryName}
            validate={validate}
            style="mr-4 w-full"
            handleSubmit={handleUpdate}
          />
        ) : (
          <p
            className="flex-1"
            onClick={() => setSelectedCategoryId(category.id)}
          >
            {category.categoryName}
          </p>
        )}
      </>
    </ModdableItem>
  )
}

export default CategoryListItem
