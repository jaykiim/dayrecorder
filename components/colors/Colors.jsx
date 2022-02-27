import React, { useState } from 'react'
import ColorForm from './ColorForm'
import Menu from './Menu'

const Colors = ({ user }) => {
  const colors = JSON.parse(user.colors)
  const folderNames = Object.keys(colors)
  const [selectedFolder, setSelectedFolder] = useState('')

  return (
    <>
      <h1 className="headingLg p-4 text-center font-black md:border-b md:text-left">
        Colors
      </h1>

      <main className="px-5 md:p-5">
        <Menu
          folderNames={folderNames}
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
        />
        <ColorForm />
      </main>
    </>
  )
}

export default Colors
