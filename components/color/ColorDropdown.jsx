import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Dropdown from '../micro/Dropdown'

const ColorDropdown = ({ style }) => {
  const categories = useSession().data.user.categories

  const [outerList, setOuterList] = useState({ id: '', state: false })
  const [innerList, setInnerList] = useState({ id: '', state: false })

  const renderInnerList = (id) =>
    categories
      .find((category) => category.id === id)
      .userColors.map(({ color, tag }, i) => <div key={i}>{tag}</div>)

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
        style={style?.outerList}
        contents={renderInnerList(category.id)}
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
        style={style?.preview}
        preview={categories[0].categoryName || '카테고리를 생성하세요'}
        contents={renderOuterList()}
        contentHeight="56"
      />
    </>
  )
}

export default ColorDropdown
