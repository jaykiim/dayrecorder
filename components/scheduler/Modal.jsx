import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { Formik } from 'formik'
import * as Yup from 'yup'

const Modal = ({ dayrecords, modal, setModal }) => {
  const { title, start, end, memo } = dayrecords

  const validate = Yup.object({
    start: Yup.string().required('시작 시각을 입력해주세요'),
    end: Yup.string().required('종료 시각을 입력해주세요'),
  })
  // 시간 포맷 오류 : 시간을 00:00 형식으로 입력해주세요
  return (
    <>
      <div
        onClick={() => setModal({ ...modal, open: false })}
        className="fixed top-0 left-0 z-20 h-full w-full bg-black bg-opacity-30"
      />
      <div
        className={`min-h-120 fixed top-1/2 left-1/2 z-30 w-72 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-lg`}
      >
        <section className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Settings</h1>
          <button className="rounded-full p-1 hover:bg-gray-100">
            <AiOutlineCloseCircle
              onClick={() => setModal({ ...modal, open: false })}
              className="text-lg text-gray-400"
            />
          </button>
        </section>

        <Formik
          initialValues={{ title, start, end, memo }}
          validationSchema={validate}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <section className="mb-5 flex flex-col">
                <label htmlFor="title" className="text-sm text-gray-400">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="제목을 입력하세요"
                  className="inputBorderBottomCarrot text-sm"
                />
              </section>

              <section className="mb-5 flex items-center gap-x-4">
                {/*  */}
                {/* GUIDE 시작 */}

                <div className="flex flex-col">
                  <label htmlFor="start" className="text-sm text-gray-400">
                    Start
                  </label>
                  <input
                    type="text"
                    value={values.start}
                    id="start"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="inputBorderBottomCarrot text-sm"
                  />
                </div>

                {/*  */}
                {/* GUIDE 물결 */}

                <p className="text-2xl text-gray-300">~</p>

                {/*  */}
                {/* GUIDE 끝 */}

                <div className="flex flex-col">
                  <label htmlFor="end" className="text-sm text-gray-400">
                    End
                  </label>
                  <input
                    type="text"
                    value={values.end}
                    id="end"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="inputBorderBottomCarrot text-sm"
                  />
                </div>
                <p className="alertTextSm">
                  {errors[end] && touched[end] && errors[end]}
                </p>
              </section>
              <p className="alertTextSm -translate-x-1 -translate-y-4">
                {(errors.start && touched.start && errors.start) ||
                  (errors.end && touched.end && errors.end)}
              </p>

              <section className="mb-5 flex flex-col">
                <label htmlFor="memo" className="text-sm text-gray-400">
                  Memo
                </label>
                <textarea
                  id="memo"
                  placeholder="여기에 메모"
                  value={values.memo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={10}
                  className="inputBorderCarrot resize-none pt-1 text-sm"
                />
              </section>

              <section className="flex gap-x-3">
                <button
                  onClick={() => setModal({ ...modal, open: false })}
                  type="button"
                  className="btnLightGreen w-full text-green-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btnLightCarrot w-full text-white"
                >
                  Create
                </button>
              </section>
            </form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default Modal
