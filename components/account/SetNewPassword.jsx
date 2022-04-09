import React, { useState } from 'react'
import { hash } from 'bcryptjs'
import Router from 'next/router'
import Form from '../micro/Form'
import validate from '../../utils/validate'
import Password from '../micro/Password'
import { changePasswordReq } from '../../apicalls/authCalls'
import { signOut } from 'next-auth/react'

const SetNewPassword = ({ user }) => {
  const [complete, setComplete] = useState(false)

  const handleSubmit = async (values) => {
    await changePasswordReq({
      password: await hash(values.password, 12),
      email: user.email,
    })

    setComplete(true)
    setTimeout(() => signOut({ callbackUrl: 'http://localhost:3000/' }))
  }

  return (
    <>
      <h1 className="mb-8 text-2xl font-black uppercase">New Password</h1>

      {complete ? (
        <div className="mt-5 w-full -translate-y-4 border border-green-600 bg-green-100 p-2">
          <p>변경 완료! 2초 뒤 로그인 페이지로 이동합니다</p>
        </div>
      ) : (
        ''
      )}

      <p>새로운 비밀번호를 설정하세요</p>

      <Form
        values={{ password: '', confirmPassword: '' }}
        validate={validate.password}
        handleSubmit={handleSubmit}
      >
        {({ values, handleChange, errors }) => (
          <div className="mt-5 flex flex-col gap-y-3">
            <Password
              inputId="password"
              placeholder="비밀번호 입력"
              value={values.password}
              handleChange={handleChange}
            />
            {errors.password && (
              <p className="alertTextSm -translate-y-1">{errors.password}</p>
            )}

            <Password
              inputId="confirmPassword"
              placeholder="비밀번호 확인"
              value={values.confirmPassword}
              handleChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="alertTextSm -translate-y-1">
                {errors.confirmPassword}
              </p>
            )}

            <div className="flex">
              <div className="flex-1" />
              <button
                type="submit"
                className="rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
              >
                다음
              </button>
            </div>
          </div>
        )}
      </Form>
    </>
  )
}

export default SetNewPassword
