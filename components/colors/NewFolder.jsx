import React, { useState } from 'react'
import uuid from 'react-uuid'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { BsCheckCircleFill } from 'react-icons/bs'
import { ImCancelCircle } from 'react-icons/im'
import { updateUserColorReq } from '../../apiCalls/colorCalls'

const NewFolder = ({ userId, folders, setFolders, defaultFolder }) => {
  const [adding, setAdding] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')

  const addFolder = () => {
    if (!newFolderName.replace(/\s+/g, '')) return

    const newFolders = [
      ...folders,
      { folderName: newFolderName, items: [], uuid: uuid() },
    ]

    updateUserColorReq(userId, { folders: newFolders, defaultFolder })
    setNewFolderName('')
    setFolders(newFolders)
    setAdding(false)
  }

  return (
    <div
      className={`flex translate-y-6 justify-center opacity-0 ${
        open && 'opacity-100'
      }`}
    >
      {adding ? (
        <div className="flex w-full items-center">
          <input
            type="text"
            placeholder="여기에 입력하세요"
            className="mr-2 w-full rounded-md bg-white px-2 focus:outline-none"
            autoFocus={true}
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <div className="flex cursor-pointer gap-x-3 rounded-full text-lg text-gray-400">
            <BsCheckCircleFill onClick={addFolder} />
            <ImCancelCircle onClick={() => setAdding(false)} />
          </div>
        </div>
      ) : (
        <div
          onClick={() => setAdding(true)}
          className="flex cursor-pointer items-center"
        >
          <AiOutlinePlusCircle className="mr-2 text-xl text-gray-400" />
          <span>추가하기</span>
        </div>
      )}
    </div>
  )
}

export default NewFolder
