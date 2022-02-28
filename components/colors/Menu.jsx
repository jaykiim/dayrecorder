import React, { useState } from 'react'
import { AiOutlineDownCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { BsCheckCircleFill } from 'react-icons/bs'
import { ImCancelCircle } from 'react-icons/im'
import { updateUserColorReq } from '../../apiCalls/colorCalls'
import BtnDelete from '../micro/BtnDelete'
import BtnUpdate from '../micro/BtnUpdate'

const Menu = ({
  selectedFolder,
  setSelectedFolder,
  folderNames,
  colors,
  setColors,
  userId,
}) => {
  const [open, setOpen] = useState(false)
  const [updating, setUpdating] = useState({ name: '', state: false })
  const [input, setInput] = useState(updating.name)

  const [adding, setAdding] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')

  const addFolder = () => {
    if (!newFolderName.replace(/\s+/g, '')) return

    const newColors = { ...colors, [newFolderName]: {} }

    updateUserColorReq(userId, newColors)
    setNewFolderName('')
    setColors(newColors)
    setAdding(false)
  }

  const deleteFolder = (name) => {
    const newColors = { ...colors }
    delete newColors[name]

    updateUserColorReq(userId, newColors)
    setColors(newColors)
  }

  const updateFolder = (name) => {
    if (!input.replace(/\s+/g, '')) return

    const isExist = !!folderNames.find((folderName) => folderName === input)
    if (isExist) return

    const newColors = { ...colors }

    Object.defineProperty(
      newColors,
      input,
      Object.getOwnPropertyDescriptor(newColors, name)
    )
    delete newColors[name]

    updateUserColorReq(userId, newColors)
    setColors(newColors)
    setInput('')
    setUpdating({ name: '', state: false })
  }

  return (
    <section className="flex items-center">
      <div
        className={`relative mr-2 h-64 max-h-10 flex-1 rounded-lg py-2 px-3 transition-all md:bg-green-300 ${
          open && 'max-h-64 bg-green-500'
        }`}
      >
        {/* GUIDE 열리기 전 */}

        <div className="flex items-center justify-between">
          <span className="font-bold">{selectedFolder}</span>
          <AiOutlineDownCircle
            onClick={() => setOpen(!open)}
            className="cursor-pointer text-xl text-gray-400"
          />
        </div>

        {/* GUIDE 폴더 목록 */}

        <ul className={`mt-3 h-36 overflow-y-scroll ${!open && 'hidden'}`}>
          {open &&
            folderNames.map((name, i) => (
              <li
                key={i}
                className="flex cursor-pointer rounded-lg border-t p-2 text-sm hover:bg-green-500"
              >
                <span className="flex-1">
                  {updating.state && updating.name === name ? (
                    <input
                      type="text"
                      autoFocus={true}
                      placeholder="여기에 입력하세요"
                      className="w-full bg-transparent focus:outline-none"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  ) : (
                    <p onClick={() => setSelectedFolder(name)}>{name}</p>
                  )}
                </span>

                <div className="flex items-center gap-x-3">
                  <BtnUpdate
                    name={name}
                    updating={updating}
                    setUpdating={setUpdating}
                    cb={updateFolder}
                  />
                  <BtnDelete
                    updating={updating}
                    name={name}
                    setUpdating={setUpdating}
                    cb={deleteFolder}
                  />
                </div>
              </li>
            ))}
        </ul>

        {/* GUIDE 추가 버튼 */}

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
      </div>
    </section>
  )
}

export default Menu
