import React from 'react'
import { Formik } from 'formik'

const Form = ({
  initialValues,
  validate,
  onSubmit,
  fields,
  formStyle,
  submitProps,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={(values, tools) => onSubmit(values, tools, submitProps)}
    >
      {({ handleSubmit, values, errors, handleChange, handleBlur }) => (
        <form
          onSubmit={handleSubmit}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit}
          className={formStyle}
        >
          {fields.map(
            ({ name, className, type, placeholder, autoFocus }, i) => (
              <section key={i}>
                <input
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  autoFocus={autoFocus}
                  value={values[name]}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={className}
                />
                <p className="alertTextSm ml-1 mt-1">{errors[name]}</p>
              </section>
            )
          )}
        </form>
      )}
    </Formik>
  )
}

export default Form
