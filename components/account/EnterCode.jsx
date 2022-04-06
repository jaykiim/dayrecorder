import React from 'react'

const EnterCode = ({ user, setStep }) => {
  const method = user.inputType === 'email' ? '이메일' : '문자 메시지'

  return (
    <>
      <h1 className="mb-8 text-2xl font-black uppercase">Enter Code</h1>
      <p>{method}로 보내드린 코드 (6자) 를 확인하세요</p>

      <form className="mt-5 flex">
        <input
          type="text"
          autoFocus={true}
          placeholder="코드 입력"
          className="mr-5 rounded-md border p-2 text-lg focus:outline-none"
        />
        <div>
          <p>다음 주소로 코드 전송됨: </p>
          <p>{user.address}</p>
        </div>
      </form>

      <div className="mt-5 flex items-center">
        <p
          onClick={() => setStep(1)}
          className="flex-1 cursor-pointer text-blue-500 hover:text-blue-600"
        >
          코드를 받지 못했나요?
        </p>

        <button className="mr-2 rounded-md bg-gray-200 py-2 px-4">취소</button>
        <button className="rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-600">
          계속
        </button>
      </div>
    </>
  )
}

export default EnterCode
