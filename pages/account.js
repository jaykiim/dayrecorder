import React from 'react'
import SideTap from '../components/container/SideTap'
import MainTap from '../components/container/MainTap'
import Profile from '../components/mypage/Profile'
import Colors from '../components/colors/Colors'
import { useSession } from 'next-auth/react'

const account = () => {
  const { data: session } = useSession()
  const { user } = session

  return (
    <>
      <SideTap>
        <Profile user={user} />
      </SideTap>
      <MainTap>
        <Colors user={user} />
      </MainTap>
    </>
  )
}

account.auth = true
export default account
