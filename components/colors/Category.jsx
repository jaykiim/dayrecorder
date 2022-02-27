import React from 'react'

const Category = ({
  folderNameList,
  selectedFolder,
  setSelectedFolder,
  width,
}) => {
  return (
    <>
      <div id="user-colors" className="overflow-x-scroll">
        <ul className="flex w-fit whitespace-nowrap pb-2 md:pt-5">
          {folderNameList.map((folderName, i) => (
            <li
              key={i}
              onClick={() => setSelectedFolder(i)}
              className={`menuItem ${
                selectedFolder === folderName && 'menuItemSelected'
              }`}
            >
              {folderName}
            </li>
          ))}
        </ul>
      </div>
      {width >= 768 && (
        <p className="mt-2 w-fit rounded-md p-1 px-2 text-xs text-gray-400 md:bg-gray-50 ">
          ⚠️ 가로 스크롤 (pc) : 커서를 메뉴에 대고 shift + 마우스휠
        </p>
      )}
    </>
  )
}

export default Category
