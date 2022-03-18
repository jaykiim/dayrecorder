import React, { useState } from 'react'
import {
  deleteUserCategoryReq,
  updateUserCategoryNameReq,
} from '../../apiCalls/colorCalls'
import BtnDelete from '../micro/BtnDelete'
import BtnUpdate from '../micro/BtnUpdate'
import CategoryForm from './CategoryForm'

const CategoryListItem = ({
  category,
  categories,
  setCategories,
  setSelectedCategoryId,
  validate,
}) => {
  const [updating, setUpdating] = useState(false)

  const handleUpdate = async (values) => {
    const updatedCategory = await updateUserCategoryNameReq(
      values.categoryName,
      category.id
    )

    const newCategories = categories.map((item) =>
      item.id === category.id ? updatedCategory : item
    )
    setCategories(newCategories)

    setUpdating(false)
  }

  const handleDelete = async () => {
    await deleteUserCategoryReq(category.id)
    const newCategories = categories.filter((item) => item.id !== category.id)
    setCategories(newCategories)
  }

  if (category.categoryName === '미분류') return <div />

  return (
    <div className="flex cursor-pointer items-center p-1 text-sm hover:bg-gray-50">
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

      <div className="flex items-center gap-x-2">
        {!updating && (
          <BtnUpdate updating={updating} setUpdating={setUpdating} />
        )}
        <BtnDelete
          updating={updating}
          setUpdating={setUpdating}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  )
}

export default CategoryListItem
