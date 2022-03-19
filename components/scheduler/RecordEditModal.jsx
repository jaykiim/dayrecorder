import React from 'react'
import { ImCancelCircle } from 'react-icons/im'
import EditorForm from './EditorForm'

const RecordEditModal = ({ modal, setModal, recordData }) => {
  return (
    <>
      <div
        onClick={() => setModal(false)}
        className="fixed top-0 left-0 h-full w-full cursor-pointer bg-black bg-opacity-20"
      />
      <div
        className="fixed left-1/2 top-1/2 z-30  -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-5 shadow-lg md:bg-white"
        style={{ width: '350px', height: '515px' }}
      >
        {/* ===============================================================================================================================  
          // GUIDE 타이틀 
        =============================================================================================================================== */}

        <div className="flex justify-between">
          {/* 제목 */}
          <h1 className="font-bold">EDIT</h1>

          {/* 닫기 버튼 */}
          <div
            onClick={() => setModal(!modal)}
            className="cursor-pointer rounded-full p-1 hover:bg-gray-100"
          >
            <ImCancelCircle className="text-gray-400" />
          </div>
        </div>

        {/* ===============================================================================================================================  
          // GUIDE 입력폼 
        =============================================================================================================================== */}

        <EditorForm recordData={recordData} setModal={setModal} />
      </div>
    </>
  )
}

export default RecordEditModal
