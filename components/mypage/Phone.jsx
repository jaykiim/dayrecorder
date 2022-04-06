import React, { useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { BsPencilSquare } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import { sendSmsCode, updatePhoneNumberReq } from '../../apiCalls/authCalls'
import Form from '../micro/Form'
import { validate } from '../../utils'

const Phone = () => {
  const user = useSession().data.user
  const [phoneNumber, setPhoneNumber] = useState(user.phone)

  const [code, setCode] = useState(null)
  const phoneNumberRef = useRef()

  const sendVerificationCode = async (values) => {
    if (!values.phoneNumber.replace(/\s+/g, '')) return

    const code = await sendSmsCode(values.phoneNumber)
    setCode(code)
    values.phoneNumber = ''
  }

  const handleSubmit = async (values, { setErrors }) => {
    const phone = +phoneNumberRef.current.value

    if (+values.verificationCode === code) {
      await updatePhoneNumberReq({ email: user.email, phone })
      setPhoneNumber(phone)
      values.verificationCode = ''
    } else {
      setErrors({ verificationCode: '인증번호가 일치하지 않습니다' })
    }
  }

  return (
    <>
      <div className="flex w-96 items-center justify-between p-2">
        <p className="text-xs text-gray-400">휴대전화</p>
        <p className="text-lg">
          {phoneNumber ? phoneNumber : '등록된 번호가 없습니다'}
        </p>

        <div className="flex cursor-pointer items-center text-xl text-gray-400">
          <div className="rounded-full p-3 hover:bg-gray-100">
            <BsPencilSquare />
          </div>

          <div className="rounded-full p-3 hover:bg-gray-100">
            <AiFillDelete />
          </div>
        </div>
      </div>

      <div className="w-96">
        <Form
          values={{ phoneNumber: '' }}
          validate={validate.phoneNumber}
          handleSubmit={sendVerificationCode}
        >
          {({ values, handleChange, errors }) => (
            <div className="mt-5 rounded-md border p-5">
              <input
                ref={phoneNumberRef}
                id="phoneNumber"
                type="text"
                placeholder="휴대폰 번호를 - 없이 입력해주세요"
                value={values.phoneNumber}
                onChange={handleChange}
                className="w-full rounded-md border p-2 focus:border-green-700 focus:outline-none"
              />

              {errors && (
                <p className="alertTextSm mt-1">{errors.phoneNumber}</p>
              )}

              <button
                type="submit"
                disabled={!values.phoneNumber}
                className={`mt-5 w-full rounded-md py-2 text-white ${
                  errors.phoneNumber || !values.phoneNumber
                    ? 'cursor-not-allowed bg-gray-200'
                    : 'bg-green-700'
                }`}
              >
                인증번호 발송
              </button>
            </div>
          )}
        </Form>

        <Form values={{ verificationCode: '' }} handleSubmit={handleSubmit}>
          {({ values, handleChange, errors }) => (
            <div className="mt-10 rounded-md border p-5">
              <input
                id="verificationCode"
                type="text"
                value={values.verificationCode}
                onChange={handleChange}
                placeholder="인증 번호를 입력해주세요"
                className="w-full rounded-md border p-2 focus:border-green-700 focus:outline-none"
              />

              {errors && (
                <p className="alertTextSm mt-1">{errors.verificationCode}</p>
              )}

              <button
                type="submit"
                disabled={!code && true}
                className={`mt-5 w-full rounded-md py-2 text-white ${
                  !code || !values.verificationCode
                    ? 'cursor-not-allowed bg-gray-200'
                    : 'bg-green-700'
                }`}
              >
                번호 등록하기
              </button>
            </div>
          )}
        </Form>
      </div>
    </>
  )
}

export default Phone
