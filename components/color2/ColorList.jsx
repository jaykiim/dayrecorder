import { useSession } from 'next-auth/react'
import React from 'react'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import {
  deleteUserColorReq,
  updateUserColorReq,
} from '../../apiCalls/colorCalls'
import {
  currentCategory,
  currentCategoryHexTag,
  currentCategoryId,
} from '../../store/common'
import ModabbleItem from '../micro/ModabbleItem'
import { colorValidate } from './utils'

const ColorList = ({ categories, setCategories }) => {
  const email = useSession().data.user.email
  const selectedCategory = useRecoilValue(currentCategory(email))
  const selectedCategoryId = useRecoilValue(currentCategoryId)
  const [updating, setUpdating] = useState({ id: '', state: false })

  // 수정 버튼 클릭 시 나올 필드들
  const editFields = [
    {
      name: 'hex',
      type: 'text',
      className:
        'px-1 w-3/4 text-sm bg-transparent border-b border-green-700 focus:outline-none',
    },
    {
      name: 'tag',
      type: 'text',
      className:
        'px-1 w-11/12 text-sm bg-transparent border-b border-green-700 focus:outline-none',
    },
  ]

  const style = {
    formStyle: 'flex w-2/3', // 수정 버튼 클릭 시 나오는 필드들의 컨테이너 (form) 태그에 적용할 스타일
    container: 'w-full p-2 border border-green-500 my-2', // Form 컴포넌트 컨테이너
    displayName: 'text-sm text-green-900 ',
  }

  // 같은 카테고리 내에서 hex 및 tag 값 중복 방지를 위해 validate에 필요한 배열
  const hexesTags = useRecoilValue(currentCategoryHexTag(email))

  const handleUpdate = async (values, _, id) => {
    const { userCategory: updatedCategory } = await updateUserColorReq({
      hex: values.hex,
      tag: values.tag,
      id,
    })

    //기존 categories 배열에서 지금 선택된 카테고리를 찾아서 업데이트
    const newCategories = categories.map((category) =>
      category.id === updatedCategory.id ? updatedCategory : category
    )

    setCategories(newCategories)
    setUpdating({ id: '', state: false })
  }

  const handleDelete = async (id) => {
    const newCategories = categories.map((category) => {
      if (category.id === selectedCategoryId)
        return {
          ...category,
          userColors: category.userColors.filter((color) => color.id !== id),
        }
      else return category
    })

    setCategories(newCategories)
    await deleteUserColorReq(id)
  }

  return (
    <div className="mt-5">
      {selectedCategory && hexesTags ? (
        selectedCategory.userColors.map((color, i) => (
          <div key={i} className="flex items-center">
            <div
              className="mr-5 h-7 w-7 rounded-full"
              style={{ backgroundColor: color.color.hex + '4D' }}
            />
            <ModabbleItem
              displayName={color.tag}
              id={color.id}
              updating={updating}
              setUpdating={setUpdating}
              editFields={editFields}
              fieldDefaultVal={{ hex: color.color.hex, tag: color.tag }}
              validate={colorValidate('update', hexesTags[1], hexesTags[0])}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              style={style}
            />
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default ColorList
