import React, { useState } from 'react'
import Category from './Category'
import ColorPicker from './ColorPicker'
import ReactTooltip from 'react-tooltip'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { useWindowSize } from 'react-use'
import ColorList from './ColorList'

const Colors = ({ user }) => {
  const { width } = useWindowSize()

  const [folders, setFolders] = useState(JSON.parse(user.colors)) // 전체 폴더 및 아이템 객체
  const folderNameList = Object.keys(folders) // 폴더명 배열

  const [selectedFolder, setSelectedFolder] = useState('기본') // 현재 선택 (클릭) 된 폴더 이름
  const selectedFolderItems = folders[selectedFolder] // 현재 선택된 폴더의 아이템 객체

  return (
    <div className="p-4 px-5">
      <header className="flex border-b border-green-300 pb-4">
        <div className="flex items-center">
          <h1 className="title">Colors</h1>
          <ReactTooltip backgroundColor="#839EA0" />
          <AiOutlineQuestionCircle
            data-tip="스케줄러 및 할일 페이지에서 사용할 색상을 저장합니다."
            className="ml-1 -translate-y-0.5 text-xl text-gray-400"
          />
        </div>
      </header>

      {/* 폴더 */}
      <Category
        folderNameList={folderNameList}
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
        width={width}
      />

      <main className="mt-10">
        <ColorPicker width={width} selectedFolderItems={selectedFolderItems} />
        <ColorList
          email={user.email}
          folders={folders}
          setFolders={setFolders}
          selectedFolder={selectedFolder}
        />
      </main>
    </div>
  )
}

export default Colors
