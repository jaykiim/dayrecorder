import React from 'react'
import { useSession } from 'next-auth/react'
import { useRecoilValueLoadable } from 'recoil'
import { allCategories } from '../../store/common'
import Title from '../micro/Title'
import PerCategory from './PerCategory'

const Statistics = () => {
  const email = useSession().data.user.email
  const categories = useRecoilValueLoadable(allCategories(email))

  return (
    <>
      <Title title="Statistics" />
      <section className="bodyContainer">
        {categories.state === 'hasValue' && (
          <PerCategory categories={categories.contents} />
        )}
      </section>
    </>
  )
}

export default Statistics
