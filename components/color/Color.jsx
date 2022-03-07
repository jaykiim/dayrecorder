import React, { useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { useSetRecoilState } from 'recoil'
import { categoriesData, currentCategoryId } from '../../store/common'
import Title from '../micro/Title'
import CategoryDropdown from './CategoryDropdown'
import NewColor from './NewColor'

const Color = () => {
  // 컴포넌트가 마운트되면 카테고리 데이터를 패치해서 전역 상태에 저장할 것임
  const setCategories = useSetRecoilState(categoriesData)

  useEffect(() => {
    const fetchCategories = async () => {
      const { user } = await getSession()
      setCategories(user.categories)
    }

    fetchCategories()
  }, [])

  // 클릭된 카테고리 아이디 세터
  const setSelectedCategoryId = useSetRecoilState(currentCategoryId)

  return (
    <>
      <Title title="Colors" />
      <section className="bodyContainer">
        <CategoryDropdown setSelectedCategoryId={setSelectedCategoryId} />
        <NewColor />
      </section>
    </>
  )
}

export default Color
