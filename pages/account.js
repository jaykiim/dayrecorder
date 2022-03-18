import React from 'react'
import SideTap from '../components/container/SideTap'
import MainTap from '../components/container/MainTap'
import Profile from '../components/mypage/Profile'
import Colors from '../components/colors/Colors'

const account = () => {
  return (
    <>
      <SideTap>
        <Profile />
      </SideTap>
      <MainTap>
        <Colors />
      </MainTap>
    </>
  )
}

account.auth = true
export default account
