import React from 'react'
import { useRecoilState } from 'recoil'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { currentCategoryId } from '../../store/common'
import { getCategoryNameValidate } from './utils'
import Dropdown2 from '../micro/Dropdown2'
import CategoryListItem from './CategoryListItem'
import CategoryForm from './CategoryForm'
import { createUserCategoryReq } from '../../apiCalls/colorCalls'

const style = {
  container: 'rounded-md border border-green-900 text-green-900',
  preview: 'flex cursor-pointer items-center py-1 px-2 border-green-900',
}

const CategoryDropdown = ({ email, categories, setCategories }) => {
  const [selectedCategoryId, setSelectedCategoryId] =
    useRecoilState(currentCategoryId)

  const validate = getCategoryNameValidate(categories)

  const getPreviewName = () => {
    const currentCategory = categories.find(
      (category) => category.id === selectedCategoryId
    )
    return currentCategory?.categoryName
  }

  const handleSubmit = async (values, { setValues }) => {
    const newCategory = await createUserCategoryReq(values.categoryName, email)
    setCategories((categories) => [...categories, newCategory])
    setValues({ categoryName: '' })
  }

  return (
    <Dropdown2
      style={style}
      preview={
        getPreviewName() ||
        categories[1].categoryName ||
        '생성된 카테고리가 없습니다'
      }
      fullHeight="210px"
      maxHeight="34px"
    >
      <>
        {/* 카테고리 목록 */}
        <div
          className="overflow-y-auto border-t border-green-900 py-2 px-1"
          style={{ height: '125px' }}
        >
          {categories.map((category, i) => (
            <CategoryListItem
              key={i}
              category={category}
              categories={categories}
              setCategories={setCategories}
              setSelectedCategoryId={setSelectedCategoryId}
              validate={validate}
            />
          ))}
        </div>

        {/* 새 카테고리 입력창 */}
        <div className="flex items-center border-t border-green-900 px-2 py-2">
          <AiOutlinePlusCircle className="mr-2 text-xl" />
          <CategoryForm
            style="w-full"
            placeholder="새 카테고리명 입력 후 Enter"
            validate={validate}
            handleSubmit={handleSubmit}
          />
        </div>
      </>
    </Dropdown2>
  )
}

export default CategoryDropdown
