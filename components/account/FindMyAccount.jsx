import React, { useRef, useState } from 'react'
import {
  findAccountByPhoneReq,
  getUserByEmailReq,
} from '../../apiCalls/authCalls'

const FindMyAccount = ({ setUser, setStep }) => {
  const inputRef = useRef()
  const [error, setError] = useState(false)

  const searchAccount = async (e) => {
    e.preventDefault()

    // 유저 입력값 (이메일 또는 휴대폰 번호)
    const userInput = inputRef.current.value

    // 정규식
    const phoneNumberRegex = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/
    const emailRegex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i

    // 이메일인지 휴대폰 번호인지 둘 다 아닌지 판별
    const inputType = phoneNumberRegex.test(userInput)
      ? 'phoneNumber'
      : emailRegex.test(userInput)
      ? 'email'
      : 'none'

    let user

    // 휴대폰 번호인 경우
    if (inputType === 'phoneNumber') {
      user = await findAccountByPhoneReq({ phone: +userInput })
    }

    // 이메일인 경우
    if (inputType === 'email') {
      user = await getUserByEmailReq(userInput)
    }

    // 일치하는 유저가 없거나 휴대폰/이메일 형식이 아닌 경우
    if (inputType === 'none' || !user) setError(true)
    //
    // 일치하는 유저를 찾은 경우
    else {
      setError(false)
      setUser({ ...user, inputType })
      setStep(1)
    }
  }

  return (
    <>
      <h1 className="mb-8 text-2xl font-black uppercase">Find My Account</h1>
      <p>계정을 검색하려면 이메일 주소 또는 휴대폰 번호를 입력하세요</p>

      {error && (
        <div className="mt-5 w-full border border-red-700 bg-red-50 p-2">
          <h1 className="font-bold">검색 결과 없음</h1>
          <p>
            검색하신 내용을 찾을 수 없습니다. 다른 정보를 이용하여 다시
            검색해주세요.
          </p>
        </div>
      )}

      <form className="mt-5" onSubmit={searchAccount}>
        <input
          ref={inputRef}
          type="text"
          placeholder="이메일 또는 휴대폰 번호"
          autoFocus={true}
          className="w-full rounded-md border p-3 text-lg focus:outline-none"
        />
      </form>
    </>
  )
}

export default FindMyAccount
