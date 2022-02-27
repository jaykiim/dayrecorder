import React from 'react'
import { Formik } from 'formik'
import { SliderPicker } from 'react-color'
import { SMALL, MEDIUM, LARGE } from '../../store/constants'
import { colorValidate } from './utils'

const ColorPicker = ({ width, selectedFolderItems }) => {
  const isLargeMobile = SMALL <= width && width < MEDIUM
  const isLarge = width >= LARGE

  // 현재 선택된 폴더의 색상명 배열 및 색상코드 배열
  const tags = Object.keys(selectedFolderItems)
  const hexes = Object.values(selectedFolderItems)

  return (
    <Formik
      initialValues={{ hex: '', colorTag: '' }}
      validationSchema={() => colorValidate('new', tags, hexes)}
      onSubmit={(values, { setSubmitting }) => console.log(values)}
    >
      {({
        values,
        setValues,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <>
          <form
            className={`mt-5 h-64 overflow-hidden rounded-xl ${
              (isLargeMobile || isLarge) && 'flex h-40'
            }`}
            onSubmit={handleSubmit}
          >
            {/*  */}
            {/* GUIDE 왼쪽 */}

            <div
              className={`flex flex-col justify-center bg-gray-50 p-5 shadow-inner`}
            >
              <h3 className="mb-4 w-fit rounded-sm uppercase text-gray-500">
                Choose Color
              </h3>
              <SliderPicker
                color={values.hex}
                onChange={(color) => setValues({ ...values, hex: color.hex })}
                className={`w-full opacity-30 ${
                  (isLargeMobile || isLarge) && 'w-64'
                }`}
              />
            </div>

            {/* GUIDE 오른쪽 */}

            <div
              id="color-picker-bg"
              className="relative flex flex-col justify-center gap-y-4 p-5 text-white"
              style={{ height: (isLargeMobile || isLarge) && '160px' }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="absolute right-0 top-0 bg-green-900 p-3 hover:shadow-md"
              >
                등록하기
              </button>
              <section
                className={`${
                  (isLargeMobile || isLarge) && 'mt-8'
                } flex w-full rounded-lg text-sm`}
              >
                <label htmlFor="hex" className="mr-4 font-bold">
                  hex
                </label>
                <input
                  type="text"
                  id="hex"
                  placeholder="색상 코드를 입력하세요 ex.#839ea0"
                  className="w-full rounded-md bg-white bg-opacity-80 pl-2 text-gray-700 focus:outline-none"
                  value={values.hex}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </section>

              <section className="flex w-full items-center rounded-lg text-sm">
                <label htmlFor="colorTag" className="mr-4 font-bold">
                  tag
                </label>
                <input
                  type="text"
                  id="colorTag"
                  placeholder="색상의 의미를 입력하세요 ex.휴식"
                  className="w-full rounded-md bg-white bg-opacity-80 pl-2 text-gray-700 focus:outline-none"
                  value={values.colorTag}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </section>
            </div>
          </form>

          <p className="reference">
            * 실제 화면에 표시될 색상과 동일합니다 (투명도가 적용되어있음)
          </p>
          <p className="alertTextSm mt-2">{errors.hex || errors.colorTag}</p>
        </>
      )}
    </Formik>
  )
}

export default ColorPicker
