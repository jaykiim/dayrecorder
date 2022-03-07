import React, { useState } from 'react'
import { updateUserColorReq } from '../../apiCalls/colorCalls'
import BtnDelete from '../micro/BtnDelete'
import BtnUpdate from '../micro/BtnUpdate'

const MenuItem = ({
  user,
  folders,
  defaultFolder,
  setFolders,
  currentFolder,
  selectedFolder,
  setSelectedFolder,
}) => {
  const [updating, setUpdating] = useState({ id: '', state: false })
  const [updateValue, setUpdateValue] = useState(currentFolder.folderName)

  const updateFolderName = (id) => {
    const newFolder = folders.map((folder) => {
      if (folder.uuid === id) folder.folderName = updateValue
      return folder
    })

    setFolders(newFolder)
    setUpdating({ id: '', state: false })
    user.colors.folders = newFolder

    updateUserColorReq(user.email, { folders: newFolder, defaultFolder })
  }

  const deleteFolder = (id) => {
    // 현재 선택된 폴더를 삭제하는 경우 선택된 폴더를 기본 폴더로 변경
    if (id === selectedFolder.id)
      setSelectedFolder(folders.find((folder) => folder.uuid === defaultFolder))

    const newFolder = folders.filter((folder) => folder.uuid !== id)

    setFolders(newFolder)
    user.colors.folders = newFolder
    updateUserColorReq(user.email, { folders: newFolder, defaultFolder })
  }

  return (
    <div className="dropdownListItem hover:bg-green-500">
      <span className="flex-1">
        {updating.state && updating.id === currentFolder.uuid ? (
          <input
            type="text"
            autoFocus={true}
            placeholder="여기에 입력하세요"
            className="w-full bg-transparent focus:outline-none"
            value={updateValue}
            onChange={(e) => setUpdateValue(e.target.value)}
          />
        ) : (
          <p
            onClick={() => {
              setSelectedFolder(currentFolder)
            }}
          >
            {currentFolder.folderName}
          </p>
        )}
      </span>
      <div className="flex items-center gap-x-3">
        <BtnUpdate
          id={currentFolder.uuid}
          updating={updating}
          setUpdating={setUpdating}
          cb={updateFolderName}
        />
        <BtnDelete
          updating={updating}
          id={currentFolder.uuid}
          setUpdating={setUpdating}
          cb={deleteFolder}
        />
      </div>
    </div>
  )
}

export default MenuItem
