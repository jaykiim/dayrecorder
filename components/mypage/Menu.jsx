import React from 'react'

const Menu = ({ selectedMenu, setSelectedMenu }) => {
  const listStyle = (currentMenu) =>
    'w-full cursor-pointer py-3 my-1 hover:bg-green-500 ' +
    (selectedMenu === currentMenu ? 'bg-green-500' : '')

  return (
    <ul className="mt-5 flex w-full gap-x-5 text-center text-sm text-green-900 md:flex-col">
      <li
        onClick={() => setSelectedMenu('colors')}
        className={listStyle('colors')}
      >
        컬러 설정
      </li>
      <li
        onClick={() => setSelectedMenu('password')}
        className={listStyle('password')}
      >
        비밀번호 변경
      </li>
      <li
        onClick={() => setSelectedMenu('verification')}
        className={listStyle('verification')}
      >
        인증 수단 추가
      </li>
    </ul>
  )
}

export default Menu
