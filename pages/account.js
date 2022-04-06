import React, { useState } from 'react'
import SideTap from '../components/container/SideTap'
import MainTap from '../components/container/MainTap'
import Profile from '../components/mypage/Profile'
import Colors from '../components/colors/Colors'
import Menu from '../components/mypage/Menu'
import Password from '../components/mypage/Password'
import Verification from '../components/mypage/Verification'

const account = () => {
  const [selectedMenu, setSelectedMenu] = useState('colors')

  return (
    <>
      <SideTap>
        <Profile />
        <Menu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      </SideTap>
      <MainTap>
        {selectedMenu === 'colors' ? (
          <Colors />
        ) : selectedMenu === 'password' ? (
          <Password />
        ) : (
          <Verification />
        )}
      </MainTap>
    </>
  )
}

account.auth = true
export default account
