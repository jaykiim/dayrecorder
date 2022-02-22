import React, { useState } from 'react'
import { BiMenu } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import { HiUserCircle } from 'react-icons/hi'
import TopDrawer from './TopDrawer'
import UserDropdown from './UserDropdown'

const Topbar = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const handleDrawer = () => {
    setToggleDrawer(!toggleDrawer)
    setToggleDropdown(false)
  }

  return (
    <>
      <nav
        id="topbar"
        className="sticky z-40 flex w-full items-center bg-white p-2 text-4xl text-gray-300"
      >
        <div className="flex flex-1">
          {toggleDrawer ? (
            <AiOutlineClose className="cursor-pointer" onClick={handleDrawer} />
          ) : (
            <BiMenu className="cursor-pointer" onClick={handleDrawer} />
          )}
          <h1 className="font-logo ml-4 translate-y-0.5 pb-3 text-2xl font-black uppercase text-gray-500">
            dayrecorder
          </h1>
        </div>
        <HiUserCircle onClick={() => setToggleDropdown(!toggleDropdown)} />
      </nav>
      <TopDrawer toggleDrawer={toggleDrawer} />
      {toggleDropdown && <UserDropdown />}
    </>
  )
}

export default Topbar
