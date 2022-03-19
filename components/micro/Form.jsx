import { Formik } from 'formik'
import React from 'react'

const Form = ({
  values,
  validate,
  handleSubmit,
  style,
  cssStyle,
  noEnter,
  children,
}) => {
  return (
    <Formik
      initialValues={values}
      validationSchema={validate}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <form
          onSubmit={props.handleSubmit}
          onKeyPress={
            noEnter ? () => {} : (e) => e.key === 'Enter' && props.handleSubmit
          }
          className={style}
          style={cssStyle}
        >
          {children(props)}
        </form>
      )}
    </Formik>
  )
}

export default Form
