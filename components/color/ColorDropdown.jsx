import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Dropdown from '../micro/Dropdown'

const ColorDropdown = ({ style }) => {
  const categories = useSession().data.user.categories

  const [outerList, setOuterList] = useState({ id: '', state: false })
  const [innerList, setInnerList] = useState({ id: '', state: false })
  console.log(categories)
  const renderInnerList = (id) =>
    categories
      .find((category) => category.id === id)
      .userColors.map(({ color, tag }, i) => (
        <div className="flex items-center" key={i}>
          <div
            className="mr-2 h-4 w-4 rounded-full"
            style={{ backgroundColor: color.hex + '4d' }}
          />
          <div className="flex-1 cursor-pointer p-2 text-sm hover:bg-gray-50">
            {tag}
          </div>
        </div>
      ))

  const renderOuterList = () =>
    categories.map((category, i) => (
      <Dropdown
        key={i}
        id={category.id}
        open={innerList}
        setOpen={setInnerList}
        before="8"
        after="56"
        preview={category.categoryName}
        style={style?.inside}
        contents={renderInnerList(category.id)}
        contentHeight="56"
      />
    ))

  return (
    <>
      <Dropdown
        id=""
        open={outerList}
        setOpen={setOuterList}
        before="8"
        after="64"
        style={style?.outside}
        preview={categories[0].categoryName || '카테고리를 생성하세요'}
        contents={renderOuterList()}
        contentHeight="56"
      />
    </>
  )
}

export default ColorDropdown
