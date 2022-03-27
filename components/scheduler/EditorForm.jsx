import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { validate } from '../../utils'
import Form from '../micro/Form'
import TextInput from '../micro/TextInput'
import ColorDropdown from '../micro/ColorDropdown'
import useRecordEditor from '../../hooks/useRecordEditor'

const EditorForm = ({ recordData, setModal }) => {
  const email = useSession().data.user.email

  // 기존 레코드 데이터
  const { userColor, start, end, title, memo } = recordData

  // 사용자가 클릭한 컬러 데이터
  const [color, setColor] = useState(userColor)

  // 입력 필드
  const fields = ['start', 'end']

  const { id: recordId, records, setRecords } = recordData
  const { handleRecordDelete, handleUpdateRecord } = useRecordEditor(
    recordId,
    records,
    setRecords,
    setModal,
    email
  )

  // 스타일
  const fieldSt = {
    container: 'flex flex-col ',
    label: 'text-xs text-gray-400 ',
    input:
      'bg-transparent text-sm border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-gray-600 ',
  }

  const fieldStFlex = {
    ...fieldSt,
    container: 'flex flex-col w-1/3',
    input: fieldSt.input + 'w-1/2',
  }

  const dropdownSt = {
    container: 'rounded-md border border-green-900 text-green-900',
    preview:
      'flex cursor-pointer items-center py-1 px-2 border-green-900 font-bold',
    open: 'overflow-y-auto',
  }

  return (
    <>
      <Form
        values={{ title, start, end, memo }}
        validate={validate.record}
        cssStyle={{ height: '435px' }}
        handleSubmit={(values, { errors, setErrors }) =>
          handleUpdateRecord({
            values,
            recordData,
            errors,
            setErrors,
            selectedColor: color,
          })
        }
        noEnter
      >
        {({ values, handleChange, errors }) => (
          <>
            <section
              className="mt-5 flex flex-col gap-y-7 overflow-y-auto overflow-x-hidden"
              style={{ height: '370px' }}
            >
              {/* ===============================================================================================================================  
                // DO 카테고리 
              =============================================================================================================================== */}

              <ColorDropdown
                color={color}
                setColor={setColor}
                style={dropdownSt}
              />
              <p className="alertTextSm absolute" style={{ top: '100px' }}>
                {errors.color}
              </p>

              {/* ================================================================================================================
                // DO 레코드 제목
              ===================================================================================================================*/}

              <TextInput
                id="title"
                value={values.title}
                handleChange={handleChange}
                style={fieldSt}
              />

              {/* ================================================================================================================
                // DO 시간
              ===================================================================================================================*/}
              <div
                className="relative flex items-center gap-x-3"
                style={{ width: '310px' }}
              >
                {fields.map((id, i) => (
                  <TextInput
                    key={i}
                    id={id}
                    value={values[id]}
                    handleChange={handleChange}
                    style={fieldStFlex}
                  />
                ))}
                <p className="alertTextSm absolute top-10">
                  {errors.start || errors.end}
                </p>
              </div>

              {/* ================================================================================================================
                // DO 메모
              ===================================================================================================================*/}

              <div className={fieldSt.container}>
                <label htmlFor="memo" className={fieldSt.label}>
                  MEMO
                </label>
                <textarea
                  id="memo"
                  value={values.memo}
                  onChange={handleChange}
                  className="h-40 w-full resize-none overflow-y-auto rounded-md border p-1 text-sm focus:border-gray-600 focus:outline-none"
                />
              </div>
            </section>

            {/* ================================================================================================================
              // DO 버튼
            ===================================================================================================================*/}

            <div className="mt-5 flex gap-x-3">
              <button
                type="button"
                onClick={() =>
                  handleRecordDelete(recordId, records, setRecords, setModal)
                }
                className="flex-1 rounded-md bg-green-500 p-2 text-white hover:bg-green-700"
              >
                Delete
              </button>
              <button
                type="submit"
                className="flex-1 rounded-md bg-carrot-light p-2 text-white hover:bg-carrot-deep"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </Form>
    </>
  )
}

export default EditorForm
