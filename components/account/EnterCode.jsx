import React, { useEffect, useRef, useState } from 'react'
import { sendEmail, sendSmsCode } from '../../apicalls/authCalls'

const EnterCode = ({ user, setStep }) => {
  const method = user.address[0] === '*' ? '문자 메세지' : '이메일'
  console.log('method', method)

  const inputRef = useRef()

  const [verificationCode, setVerficationCode] = useState()
  const [error, setError] = useState(false)

  const sendCodeToEmail = async () => {
    await sendEmail(user.email, setVerficationCode)
  }

  const sendCodeToPhone = async () => {
    const code = await sendSmsCode('0' + user.phone)
    setVerficationCode(code)
  }

  useEffect(() => {
    if (method === '문자 메세지') sendCodeToPhone()
    else sendCodeToEmail()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault(true)

    if (verificationCode === +inputRef.current.value) setStep(3)
    else setError(true)
  }

  console.log(user)

  return (
    <>
      <h1 className="mb-8 text-2xl font-black uppercase">Enter Code</h1>
      <p>{method}로 보내드린 코드 (6자) 를 확인하세요</p>

      {error ? (
        <div className="mt-5 w-full border border-red-700 bg-red-50 p-2">
          <p>보내드린 코드와 일치하지 않습니다</p>
        </div>
      ) : (
        ''
      )}

      <form className="mt-5" onSubmit={handleSubmit}>
        <section className="flex">
          <input
            ref={inputRef}
            type="text"
            autoFocus={true}
            placeholder="코드 입력"
            className="mr-5 rounded-md border p-2 text-lg focus:outline-none"
          />
          <div>
            <p>다음 주소로 코드 전송됨: </p>
            <p>{user.address}</p>
          </div>
        </section>

        <section className="mt-5 flex items-center">
          <p
            onClick={() => setStep(1)}
            className="flex-1 cursor-pointer text-blue-500 hover:text-blue-600"
          >
            코드를 받지 못했나요?
          </p>

          <button
            type="submit"
            className="rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
          >
            계속
          </button>
        </section>
      </form>
    </>
  )
}

export default EnterCode
