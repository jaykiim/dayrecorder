import { getSession } from 'next-auth/react'
import React from 'react'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { categoriesData } from '../../store/common'
import Title from '../micro/Title'
import CategoryDropdown from './CategoryDropdown'

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

  return (
    <>
      <Title title="Colors" />
      <section className="bodyContainer">
        <CategoryDropdown />
      </section>
    </>
  )
}

export default Color
