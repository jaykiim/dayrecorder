import React from 'react'
import { useRecoilValue } from 'recoil'
import { currentCategoryId } from '../../store/common'
import ColorListItem from './ColorListItem'

const ColorList = ({ categories, setCategories }) => {
  const selectedCategoryId =
    useRecoilValue(currentCategoryId) || categories[1].id

  const currentCategory = categories.find(
    (category) => category.id === selectedCategoryId
  )

  return (
    <div className="mt-8 flex flex-col gap-y-6">
      {currentCategory.userColors?.map((color, i) => (
        <div key={i} className="rounded-lg border border-green-500 p-2">
          <ColorListItem
            colorInfo={color}
            selectedCategoryId={selectedCategoryId}
            categories={categories}
            setCategories={setCategories}
          />
        </div>
      ))}
    </div>
  )
}

export default ColorList
