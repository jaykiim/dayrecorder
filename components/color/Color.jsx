import React, { useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { categoriesData, currentCategoryId } from '../../store/common'
import Title from '../micro/Title'
import CategoryDropdown from './CategoryDropdown'
import NewColor from './NewColor'
import ColorList from './ColorList'

const Color = () => {
  // 컴포넌트가 마운트되면 카테고리 데이터를 패치해서 전역 상태에 저장할 것임
  const [categories, setCategories] = useRecoilState(categoriesData)
  const setSelectedCategoryId = useSetRecoilState(currentCategoryId)

  useEffect(() => {
    const fetchCategories = async () => {
      const { user } = await getSession()
      setCategories(user.categories)
      setSelectedCategoryId(user.categories[0].id)
    }

    fetchCategories()
  }, [])

  return (
    <>
      <Title title="Colors" />
      <section className="bodyContainer">
        <CategoryDropdown setSelectedCategoryId={setSelectedCategoryId} />
        <NewColor />
        <ColorList categories={categories} setCategories={setCategories} />
      </section>
    </>
  )
}

export default Color
