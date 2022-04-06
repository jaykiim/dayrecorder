import React, { useState } from 'react'

const ResetPassword = ({ user, setUser, setStep }) => {
  const { email, phone, inputType } = user

  // 이메일 주소 가리기
  const hideEmail = (email) => {
    const [account, domain] = email.split('@')

    const hide = (str) =>
      str[0] +
      str
        .slice(1)
        .split('')
        .map(() => '*')
        .join('')

    return hide(account) + '@' + hide(domain)
  }

  // 휴대폰 번호 가리기
  const hidePhone = (phone) =>
    phone
      .slice(0, -2)
      .split('')
      .map(() => '*')
      .join('') + phone.slice(-2)

  // 재설정 코드를 받을 수단
  const [method, setMethod] = useState(null)
  const handleChange = (e, type) => setMethod({ address: e.target.value, type })

  const handleClick = () => {
    setUser({
      ...user,
      address:
        method.type === 'email'
          ? hideEmail(method.address)
          : hidePhone(method.address),
    })

    setStep(2)
  }

  return (
    <>
      <h1 className="mb-8 text-2xl font-black uppercase">Reset Password</h1>
      <p>어떤 방법으로 비밀번호 재설정 코드를 받으시겠어요?</p>

      <div className="mt-5">
        <input
          id={email}
          value={email}
          name="method"
          type="radio"
          onChange={(e) => handleChange(e, 'email')}
        />
        <span className="ml-2">이메일로 코드 받기</span>
        <p>{inputType === 'email' ? email : hideEmail(email)}</p>
      </div>

      {phone ? (
        <div className="mt-5">
          <input
            id={phone}
            value={phone}
            name="method"
            type="radio"
            onChange={(e) => handleChange(e, 'phone')}
          />
          <span className="ml-2">SMS로 코드 받기</span>
          <p>{inputType === 'phone' ? phone : hidePhone(phone.toString())}</p>
        </div>
      ) : (
        ''
      )}

      <div className="flex">
        <div className="flex-1" />

        <button
          onClick={() => setStep(0)}
          className="mr-2 rounded-md bg-gray-200 py-2 px-5"
        >
          회원님이 아닌가요?
        </button>

        <button
          disabled={!method}
          onClick={handleClick}
          className={`rounded-md bg-blue-500 py-2 px-5 text-white hover:bg-blue-600 ${
            !method && 'cursor-not-allowed'
          }`}
        >
          계속하기
        </button>
      </div>
    </>
  )
}

export default ResetPassword
