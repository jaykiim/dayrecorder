import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Formik } from 'formik'
import { recordValidate } from './utils'
import { DEFAULT_COLOR } from '../../store/constants'
import TextInput from '../micro/TextInput'
import BtnText from '../micro/BtnText'
import ColorDropdown from '../color2/ColorDropdown'
import { convertToMin } from '../scheduler2/utils'
import { updateRecordReq } from '../../apiCalls/recordCalls'

const EditorForm = ({ recordData, setModal }) => {
  const email = useSession().data.user.email

  /* ===============================================================================================================================  
    // TODO 사용자 입력 값
  =============================================================================================================================== */

  // 기존 레코드 데이터
  const {
    userColor,
    id: recordId,
    start,
    end,
    title,
    memo,
    records, // 전체 레코드 목록
    setRecords,
  } = recordData

  // 입력받을 값
  const initialValues = { title, start, end, memo }

  // 컬러
  const [selectedColor, setSelectedColor] = useState(userColor) // 사용자가 클릭한 컬러 데이터
  const handleColorClick = (colorInfo) => setSelectedColor(colorInfo) // 드롭다운에서 컬러 클릭 시 콜백

  /* ===============================================================================================================================  
    // TODO 드롭다운 / 버튼 / 입력 필드 스타일 
  =============================================================================================================================== */

  // 드롭다운
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

  // 버튼
  const btnStyle = 'p-2 flex-1 rounded-md '

  // 입력 필드
  const fieldStyle = {
    container: 'flex flex-col ',
    label: 'text-xs text-gray-400 ',
    input:
      'bg-transparent text-sm border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-gray-600 ',
  }

  /* ===============================================================================================================================  
    // TODO 레코드 수정 사항 등록
  =============================================================================================================================== */

  const handleSubmit = async (values, { errors, setErrors }) => {
    const { start, end, title, memo } = values

    // 삭제된 컬러인데 재선택 안하고 그냥 submit 누른 경우
    if (!selectedColor) {
      setErrors({ ...errors, color: '컬러를 선택해주세요' })
      return
    }

    // 시작 시간보다 끝난 시간이 빠른 경우
    if (convertToMin(start) - convertToMin(end) > 0) {
      setErrors({ ...errors, start: '시작 시간이 종료 시간보다 빠릅니다' })
      return
    }

    const request = {
      ...recordData,
      start,
      end,
      title,
      memo,
      email,
      colorId: selectedColor.id,
      categoryId: selectedColor.userCategory.id,
      recordId,
    }

    const updatedRecord = await updateRecordReq(request)

    const updatedRecords = records.map((record) => {
      if (record.id === recordId) return updatedRecord
      return record
    })

    setRecords(updatedRecords)
    setModal(false)
  }

  /* ===============================================================================================================================  
    // TODO 레코드 삭제
  =============================================================================================================================== */

  const handleDelete = async () => {
    const updatedRecords = records.filter((record) => record.id !== recordId)

    setRecords(updatedRecords)
    setModal(false)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={recordValidate}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, values, handleBlur, handleChange, errors }) => (
        <>
          <form
            onSubmit={handleSubmit}
            className="relative my-5 flex h-full flex-col gap-y-5 overflow-y-auto"
          >
            <div className="relative flex flex-col">
              {/* ===============================================================================================================================  
                // DO 카테고리 
              =============================================================================================================================== */}

              <ColorDropdown
                defaultColor={
                  selectedColor || {
                    color: { hex: DEFAULT_COLOR.hex },
                    tag: '삭제된 컬러',
                  }
                }
                handleColorClick={handleColorClick}
                style={colordropdownStyle}
              />

              {errors.color && <p className="alertTextSm">{errors.color}</p>}
            </div>

            {/* ================================================================================================================
              // DO 레코드 제목
             ===================================================================================================================*/}

            <TextInput
              type="text"
              id="title"
              name="title"
              placeholder="제목을 입력하세요"
              values={values}
              handleBlur={handleBlur}
              handleChange={handleChange}
              styles={fieldStyle}
            />

            {/* 시간 */}
            <div
              className="flex items-center gap-x-3"
              style={{ width: '310px' }}
            >
              {/* ================================================================================================================
                // DO 시작 시각
              ===================================================================================================================*/}

              <TextInput
                type="text"
                id="start"
                name="start"
                values={values}
                handleBlur={handleBlur}
                handleChange={handleChange}
                styles={{
                  ...fieldStyle,
                  container: 'flex flex-col w-1/3',
                  input: fieldStyle.input + 'w-1/2',
                }}
              />

              {/* ================================================================================================================
                // DO 종료 시각
              ===================================================================================================================*/}

              <TextInput
                type="text"
                id="end"
                name="end"
                values={values}
                handleBlur={handleBlur}
                handleChange={handleChange}
                styles={{
                  ...fieldStyle,
                  container: 'flex flex-col w-1/3',
                  input: fieldStyle.input + 'w-1/2',
                }}
              />
            </div>
            {(errors.start || errors.end) && (
              <p className="alertTextSm absolute" style={{ top: '150px' }}>
                {errors.start || errors.end}
              </p>
            )}

            {/* ================================================================================================================
              // DO 메모
            ===================================================================================================================*/}

            <div className={fieldStyle.container}>
              <label htmlFor="memo" className={fieldStyle.label}>
                MEMO
              </label>
              <textarea
                id="memo"
                className="h-40 w-full resize-none overflow-y-auto rounded-md border p-1 text-sm focus:border-gray-600 focus:outline-none"
              />
            </div>
          </form>

          <div className="flex gap-x-3">
            {/* ================================================================================================================
              // DO 삭제 버튼
            ===================================================================================================================*/}
            <button
              onClick={handleDelete}
              className={btnStyle + 'bg-green-300 hover:bg-green-500'}
            >
              Delete
            </button>

            {/* ================================================================================================================
              // DO 등록 (수정) 버튼
            ===================================================================================================================*/}

            <button
              type="submit"
              onClick={handleSubmit}
              className={
                btnStyle + 'bg-carrot-light text-white hover:bg-carrot-deep'
              }
            >
              Submit
            </button>
          </div>
        </>
      )}
    </Formik>
  )
}

export default EditorForm
