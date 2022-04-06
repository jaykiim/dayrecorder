import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { hash } from 'bcryptjs'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { changePasswordReq } from '../../apiCalls/authCalls'
import { validate } from '../../utils'
import Form from '../micro/Form'
import Password from '../micro/Password'

const PasswordChange = ({ setPass }) => {
  const email = useSession().data.user.email

  const fields = [
    { id: 'password', placeholder: '새 비밀번호' },
    { id: 'confirmPassword', placeholder: '새 비밀번호 확인' },
  ]

  const [complete, setComplete] = useState(false)

  const handleSubmit = async (values) => {
    console.log(values)

    await changePasswordReq({
      email,
      password: await hash(values.password, 12),
    })

    setComplete(true)
    setTimeout(() => setPass(false), 3000)
  }

  return (
    <Form
      values={{ password: '', confirmPassword: '' }}
      validate={validate.password}
      handleSubmit={handleSubmit}
    >
      {({ values, handleChange, errors }) => (
        <>
          {complete && (
            <div className="mb-3 flex items-center">
              <AiOutlineCheckCircle className="mr-2 text-xl text-green-500" />
              <p className="text-lg text-gray-400">변경 완료</p>
            </div>
          )}
          {fields.map(({ id, placeholder }, i) => (
            <div key={i}>
              <Password
                inputId={id}
                value={values[id]}
                handleChange={handleChange}
                placeholder={placeholder}
                error={errors[id]}
              />
              <p className="mt-1 mb-5 text-xs text-carrot-light">
                {errors[id]}
              </p>
            </div>
          ))}

          <div className="flex">
            <div className="flex-1" />
            <button
              type="submit"
              className="rounded-md bg-green-700 py-2 px-4 text-right text-white hover:bg-green-900"
            >
              비밀번호 변경
            </button>
          </div>
        </>
      )}
    </Form>
  )
}

export default PasswordChange
