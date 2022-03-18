import { Formik } from 'formik'
import React from 'react'

const Form2 = ({
  values,
  validate,
  handleSubmit,
  style,
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
        >
          {children(props)}
        </form>
      )}
    </Formik>
  )
}

export default Form2
