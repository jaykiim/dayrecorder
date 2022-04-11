import { useState } from 'react'
import dynamic from 'next/dynamic'
import Router from 'next/router'
import Link from 'next/link'
import { createUserByEmailReq, sendEmail } from '../apiCalls/authCalls'
import { Formik } from 'formik'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import { AiFillCheckCircle } from 'react-icons/ai'
import { useWindowSize } from '../hooks/useWindowSize'
import { useSession } from 'next-auth/react'

YupPassword(Yup)

const register = () => {
  const { data: session } = useSession()
  if (session) Router.push('/')

  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false)
  const [newUserName, setNewUserName] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const { width, height } = useWindowSize()

  // 동적 임포트를 안하면 서버랑 클라이언트에서 윈도우 너비가 다르다고 에러가 난다
  // 이 에러에 대한 내용은 https://github.com/vercel/next.js/discussions/18379
  // 다이나믹 임포트에 대한 자세한 내용은 https://nextjs.org/docs/advanced-features/dynamic-import
  const Confetti = dynamic(() => import('react-confetti'), { ssr: false })

  const fields = [
    {
      id: 'username',
      label: '닉네임',
      placeholder: '특수문자 및 공백 사용 불가',
    },
    { id: 'email', label: '이메일' },
    {
      id: 'verificationCode',
      label: '인증코드',
      placeholder: '메일을 확인하시고 6자리의 숫자를 입력해주세요',
    },
    {
      id: 'password',
      label: '비밀번호',
      placeholder: '최소 8자, 대문자/특수문자/숫자 각 하나 이상 포함',
    },
    { id: 'confirmPassword', label: '비밀번호 확인' },
  ]

  const validate = Yup.object({
    username: Yup.string()
      .max(15, '닉네임은 최대 15글자입니다')
      .matches(/[A-Za-z0-9ㄱ-힣]$/g, '특수문자 및 공백은 사용할 수 없습니다')
      .required('필수 입력 항목입니다'),
    email: Yup.string()
      .email('잘못된 이메일 형식입니다')
      .required('필수 입력 항목입니다'),
    password: Yup.string()
      .min(8, '최소 8자 이상이어야 합니다')
      .minUppercase(1, '하나 이상의 대문자를 포함해야 합니다')
      .minNumbers(1, '하나 이상의 숫자를 포함해야 합니다')
      .minSymbols(1, '하나 이상의 특수문자를 포함해야 합니다')
      .required('필수 입력 항목입니다'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다')
      .required('필수 입력 항목입니다'),
    verificationCode: Yup.string()
      .matches(verificationCode, '발송된 코드와 일치하지 않습니다')
      .required('필수 입력 항목입니다'),
  })

  return (
    <div className="relative flex h-screen items-center justify-center bg-gray-100">
      {isRegisterSuccess && (
        <>
          <Confetti width={width} height={height} />
          <div className="absolute h-full w-full bg-black bg-opacity-40" />
          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="flex justify-center text-5xl font-black text-gray-100 opacity-90">
              환영합니다, {newUserName}님 🎉
            </h1>
            <p className="absolute left-1/2 mt-8 w-fit -translate-x-1/2 rounded-md bg-gray-700 bg-opacity-80 py-1 px-2 text-lg text-gray-200">
              2초 뒤 로그인 페이지로 이동합니다
            </p>
          </div>
        </>
      )}
      <div className="w-5/6 rounded-md bg-white py-10 px-8 xl:w-1/4">
        <Link href="/login">
          <p className="mb-1 w-fit cursor-pointer py-1 px-2 text-xs text-gray-400 hover:rounded-lg hover:bg-gray-100 hover:text-blue-400">
            &larr; 돌아가기
          </p>
        </Link>
        <h1 className="mb-8 text-2xl font-black uppercase">register</h1>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            verificationCode: '',
          }}
          validationSchema={validate}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true)

            const res = await createUserByEmailReq(values)
            setNewUserName(res.username)
            setIsRegisterSuccess(true)
            setSubmitting(false)

            setTimeout(() => Router.push('/login'), 3000)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="my-4 ml-1 items-baseline tracking-widest">
                {fields.map((field, i) => {
                  return (
                    <div key={i} className="mb-4">
                      <section className="mb-2 flex items-center">
                        <AiFillCheckCircle
                          className={`mr-2 ${
                            errors[field.id] &&
                            touched[field.id] &&
                            errors[field.id]
                              ? 'text-red-600'
                              : 'text-gray-300'
                          }`}
                        />
                        <label
                          htmlFor={field.id}
                          className={`text-sm font-semibold ${
                            errors[field.id] &&
                            touched[field.id] &&
                            errors[field.id]
                              ? 'text-red-600'
                              : 'text-gray-400'
                          }`}
                        >
                          {field.label}
                        </label>
                      </section>
                      <section className="col-span-9 flex items-center">
                        <input
                          key={i}
                          type={
                            field.id === 'password' ||
                            field.id === 'confirmPassword'
                              ? 'password'
                              : 'text'
                          }
                          id={field.id}
                          placeholder={field.placeholder}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values[field.id]}
                          className="inputBorderBottomBlue mb-4"
                        />
                        {field.id === 'email' && (
                          <button
                            onClick={() =>
                              sendEmail(values.email, setVerificationCode)
                            }
                            className="btnGray ml-2 w-40 -translate-y-2"
                          >
                            인증코드 발송
                          </button>
                        )}
                      </section>

                      <p className="alertTextSm -translate-y-3 tracking-normal">
                        {errors[field.id] &&
                          touched[field.id] &&
                          errors[field.id]}
                      </p>
                    </div>
                  )
                })}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btnFullBlue mt-3"
              >
                회원가입
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default register
