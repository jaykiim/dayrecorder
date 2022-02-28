import React from 'react'
import { Formik } from 'formik'
import NewColor from './NewColor'
import { LARGE, MEDIUM, SMALL } from '../../store/constants'
import { useWindowSize } from 'react-use'
import * as Yup from 'yup'

const ColorForm = () => {
  const { width } = useWindowSize()

  // 라지 모바일 or 큰 화면
  const flex = (SMALL <= width && width < MEDIUM) || width >= LARGE

  const colorValidate = (where, tags, hexes) => {
    return Yup.object({
      hex: Yup.string()
        .required('* 색상 코드를 입력해주세요')
        .notOneOf(
          where === 'update' ? [] : hexes,
          '* 이미 폴더에 존재하는 색상입니다'
        )
        .matches(
          /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
          '* 존재하지 않는 색상 코드입니다'
        ),
      colorTag: Yup.string()
        .required('* 색상 이름 (tag) 을 입력해주세요')
        .notOneOf(tags, '* 이미 폴더에 존재하는 색상명입니다'),
    })
  }

  return (
    <Formik
      initialValues={{ hex: '', tag: '' }}
      // validationSchema={() => colorValidate("new", )}
      // onSubmit={onSubmit}
    >
      {(props) => (
        <form
          onSubmit={props.handleSubmit}
          className={`mt-3 ${flex && 'mt-5 flex'} shadow-lg`}
        >
          <NewColor {...{ ...props, flex }} />
        </form>
      )}
    </Formik>
  )
}

export default ColorForm
