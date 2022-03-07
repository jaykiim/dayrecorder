import React from 'react'
import { Formik } from 'formik'

const Form = ({
  initialValues,
  validate,
  onSubmit,
  fields,
  formStyle,
  alertStyle,
  submitProps,
  renderComponents,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={(values, tools) => onSubmit(values, tools, submitProps)}
    >
      {(props) => (
        <form
          onSubmit={props.handleSubmit}
          onKeyDown={(e) => e.key === 'Enter' && props.handleSubmit}
          className={formStyle}
        >
          {renderComponents && renderComponents(props)}
          {fields?.map(
            ({ name, className, type, placeholder, autoFocus }, i) => (
              <section key={i} className="flex h-full flex-col justify-center">
                <input
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  autoFocus={autoFocus}
                  value={props.values[name]}
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                  className={className}
                />
                {props.errors[name] && (
                  <p className={alertStyle}>{props.errors[name]}</p>
                )}
              </section>
            )
          )}
        </form>
      )}
    </Formik>
  )
}

export default Form
