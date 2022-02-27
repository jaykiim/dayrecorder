import React, { useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import {
  AiOutlineDelete,
  AiFillCheckCircle,
  AiFillCloseCircle,
} from 'react-icons/ai'
import { Formik } from 'formik'
import { colorValidate } from './utils'
import { updateUserColorReq } from '../../apiCalls/colorCalls'

const ColorList = ({ email, folders, setFolders, selectedFolder }) => {
  const items = folders[selectedFolder]

  const colorTags = Object.keys(items)
  const hexes = Object.values(items)

  const [updater, setUpdater] = useState({ fieldName: 0, isUpdating: false })

  return (
    <section className="mt-10">
      {colorTags.map((colorTag, i) => (
        <div key={i} className="my-4 ml-2 flex items-center">
          {/*  */}
          {/* GUIDE 컬러칩 */}

          <div
            className="mr-6 h-6 w-6 rounded-full"
            style={{ backgroundColor: items[colorTag] + '80' }}
          />

          {/* GUIDE 컬러 수정 */}

          <Formik
            initialValues={{ hex: items[colorTag], colorTag }}
            validationSchema={() => colorValidate('update', colorTags, hexes)}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true)

              const { hex, colorTag } = values
              delete items[updater.fieldName] // 수정되기 전의 아이템을 삭제한 후
              items[colorTag] = hex // 수정된 아이템을 추가

              const newFolders = { ...folders, [selectedFolder]: items }
              setFolders(newFolders)

              await updateUserColorReq(email, JSON.stringify(newFolders))

              setUpdater({ fieldName: 0, isUpdating: false })
              setSubmitting(false)
            }}
          >
            {({ values, handleSubmit, handleBlur, handleChange, errors }) => (
              <form onSubmit={handleSubmit} className="relative flex flex-1">
                {updater.isUpdating && updater.fieldName === colorTag ? (
                  <section className="flex flex-1 gap-x-8 text-sm">
                    {/* ===========================================================================
                      Hex 입력 
                    =========================================================================== */}

                    <div className="flex items-center">
                      <span className="mr-2 text-xs font-bold">HEX</span>
                      <input
                        id="hex"
                        type="text"
                        className="inputUnderline"
                        value={values.hex}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    {/* ===========================================================================
                      Tag 입력 
                    =========================================================================== */}

                    <div className="flex items-center">
                      <span className="mr-2 text-xs font-bold">TAG</span>
                      <input
                        id="colorTag"
                        type="text"
                        className="inputUnderline"
                        value={values.colorTag}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </section>
                ) : (
                  <div className="flex flex-1 items-center text-sm tracking-wider">
                    {colorTag}
                  </div>
                )}

                {/* 에러메세지 */}
                <p className="alertTextSm absolute top-8">
                  {updater.fieldName !== 0 && (errors.hex || errors.colorTag)}
                </p>

                {/* GUIDE 버튼 */}

                <div className="flex">
                  {/* 수정 or 등록*/}
                  <div className="btnIconHoverContainer">
                    {
                      // 등록
                      updater.fieldName === colorTag ? (
                        <button type="submit">
                          <AiFillCheckCircle className="text-green-700" />
                        </button>
                      ) : (
                        // 수정

                        <BsPencilSquare
                          onClick={() =>
                            setUpdater({
                              fieldName: colorTag,
                              isUpdating: true,
                            })
                          }
                        />
                      )
                    }
                  </div>

                  {/* 삭제 or 취소 */}
                  <div className="btnIconHoverContainer">
                    {updater.fieldName === colorTag ? (
                      <AiFillCloseCircle
                        onClick={() =>
                          setUpdater({ fieldName: 0, isUpdating: false })
                        }
                        className="font-bold text-red-700"
                      />
                    ) : (
                      <AiOutlineDelete />
                    )}
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      ))}
    </section>
  )
}

export default ColorList
