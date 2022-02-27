import React from 'react'
import { Formik } from 'formik'
import NewColor from './NewColor'
import { LARGE, MEDIUM, SMALL } from '../../store/constants'
import { useWindowSize } from 'react-use'

const ColorForm = () => {
  const { width } = useWindowSize()

  // 라지 모바일 or 큰 화면
  const flex = (SMALL <= width && width < MEDIUM) || width >= LARGE

  return (
    <Formik
      initialValues={{ hex: '', tag: '' }}
      // validationSchema={validationSchema}
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
