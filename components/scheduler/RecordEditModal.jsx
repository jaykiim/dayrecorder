import React from 'react'
import { ImCancelCircle } from 'react-icons/im'
import ColorDropdown from '../color/ColorDropdown'
import BtnText from '../micro/BtnText'

const RecordEditModal = ({ modal, setModal, recordData }) => {
  const { userCategory, userColor, id, start, end, title, memo } = recordData

  const colordropdownStyle = {
    outside: {
      container: 'border border-gray-600',
      icon: 'mr-2 text-xl text-gray-600',
      title: 'text-sm text-gray-600',
      underlineColor: 'border-gray-600',
    },
    inside: {
      container: '',
      icon: 'mr-1 text-gray-600',
      title: 'p-2 w-full text-sm text-gray-600 rounded-md hover:bg-gray-50',
      underlineColor: 'border-gray-600 mt-1',
    },
  }

  const btnStyle = 'p-2 flex-1 rounded-md '

  return (
    <>
      <div
        onClick={() => setModal(false)}
        className="fixed top-0 left-0 h-full w-full cursor-pointer bg-black bg-opacity-20"
      />
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-5 shadow-lg md:bg-white"
        style={{ width: '350px', height: '500px' }}
      >
        {/* ===============================================================================================================================  
          // GUIDE 타이틀 
        =============================================================================================================================== */}

        <div className="flex justify-between">
          <h1 className="font-bold">EDIT</h1>

          {/* 닫기 버튼 */}
          <div
            onClick={() => setModal(!modal)}
            className="cursor-pointer rounded-full p-1 hover:bg-gray-100"
          >
            <ImCancelCircle className="text-gray-400" />
          </div>
        </div>

        <div className="flex h-full flex-col">
          <div className="flex flex-1 flex-col gap-y-3 py-3">
            {/* ===============================================================================================================================  
              // GUIDE 카테고리 
            =============================================================================================================================== */}

            <div>
              <ColorDropdown style={colordropdownStyle} />
            </div>
          </div>

          {/* ===============================================================================================================================  
              // GUIDE 하단 버튼 
            =============================================================================================================================== */}
          <div className="mb-5 flex gap-x-3">
            <BtnText
              text="Delete"
              style={btnStyle + 'bg-green-300 hover:bg-green-500'}
            />
            <BtnText
              text="Submit"
              style={
                btnStyle + 'bg-carrot-light text-white hover:bg-carrot-deep'
              }
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default RecordEditModal
