import React from 'react'
import { useState } from 'react'
import ColorForm from './ColorForm'
import ColorList from './ColorList'
import Menu from './Menu'

const Colors = ({ user }) => {
  const [folders, setFolders] = useState(user.colors.folders)
  const [defaultFolder, setDefaultFolder] = useState(user.colors.defaultFolder)
  const [selectedFolder, setSelectedFolder] = useState(
    folders.find((folder) => folder.uuid === user.colors.defaultFolder)
  )

  return (
    <>
      <h1 className="headingLg p-4 text-center font-black md:border-b md:text-left">
        Colors
      </h1>

      <main className="px-5 md:p-5">
        <Menu
          userId={user.email}
          defaultFolder={defaultFolder}
          folders={folders}
          setFolders={setFolders}
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
        />
        <ColorForm
          userId={user.email}
          folders={folders}
          setFolders={setFolders}
          selectedFolder={selectedFolder}
          defaultFolder={defaultFolder}
        />
        <ColorList selectedFolder={selectedFolder} />
      </main>
    </>
  )
}

export default Colors
