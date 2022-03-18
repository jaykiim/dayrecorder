import React from 'react'
import { useRecoilStateLoadable } from 'recoil'
import { categoriesData } from '../../store/common'
import Title from '../micro/Title'
import CategoryDropdown from './CategoryDropdown'
import NewColor from './NewColor'
import ColorList from './ColorList'

const Color = ({ user }) => {
  const [categories, setCategories] = useRecoilStateLoadable(
    categoriesData(user.email)
  )

  return (
    <>
      <Title title="Colors" />
      <section className="bodyContainer">
        {categories.state === 'hasValue' ? (
          <>
            <CategoryDropdown
              categories={categories.contents}
              setCategories={setCategories}
            />
            <NewColor
              categories={categories.contents}
              setCategories={setCategories}
            />
            <ColorList
              categories={categories.contents}
              setCategories={setCategories}
            />
          </>
        ) : (
          <div>Loading...</div>
        )}
      </section>
    </>
  )
}

export default Color
