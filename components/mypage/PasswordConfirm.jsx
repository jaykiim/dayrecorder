import React, { useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { compare } from 'bcryptjs'
import { getUserByEmailReq } from '../../apiCalls/authCalls'
import Password from '../micro/Password'
import Link from 'next/link'

const PasswordConfirm = ({ setPass }) => {
  const valueRef = useRef()
  const email = useSession().data.user.email
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const password = valueRef.current.value
    const user = await getUserByEmailReq(email)
    const isValid = await compare(password, user.password)

    if (!isValid) {
      setError(
        '잘못된 비밀번호입니다. 다시 시도하거나 비밀번호 찾기를 클릭하여 재설정하세요'
      )
      return
    }

    setPass(true)
  }

  return (
    <>
      <p>계속 하려면 먼저 본인임을 인증하세요.</p>

      <form onSubmit={handleSubmit} className="mt-5">
        <Password
          inputRef={valueRef}
          inputId="passwordConfirm"
          placeholder="비밀번호 입력"
        />

        {error && <p className="mt-2 text-xs text-carrot-deep">{error}</p>}

        <div className="mt-4 flex items-center justify-between">
          <Link href="/findAccount">
            <p className="cursor-pointer rounded-md p-1 hover:bg-green-300">
              비밀번호 찾기
            </p>
          </Link>
          <button
            type="submit"
            className="rounded-md bg-green-700 px-5 py-2 text-white hover:bg-green-900"
          >
            다음
          </button>
        </div>
      </form>
    </>
  )
}

export default PasswordConfirm
