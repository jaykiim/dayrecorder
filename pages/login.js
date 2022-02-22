import { useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { MdOutlineMailOutline, MdOutlinePassword } from 'react-icons/md'
import Or from '../components/micro/Or'

const Login = () => {
  const { data: session } = useSession()
  if (session) Router.push('/')

  const fields = [
    {
      type: 'email',
      icon: <MdOutlineMailOutline className="mr-3 translate-y-2 text-xl" />,
      placeholder: 'user@gmail.com',
    },
    {
      type: 'password',
      icon: <MdOutlinePassword className="mr-3 translate-y-2 text-xl" />,
      placeholder: '비밀번호',
    },
  ]

  const validate = Yup.object({
    email: Yup.string().required('이메일을 입력해주세요'),
    password: Yup.string().required('비밀번호를 입력해주세요'),
  })

  const [serverMsg, setServerMsg] = useState('')

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-5/6 rounded-md bg-white p-12 md:w-3/5 lg:w-2/5 xl:w-1/4">
        <h1 className="mb-2 text-2xl font-black uppercase">login</h1>
        <p className="alertTextSm">{serverMsg}</p>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validate}
          onSubmit={async (values, { setSubmitting }) => {
            // 기본 제공되는 로그인 페이지로 리디렉션 하지 않기 위해 signIn 함수에 첫 번째 인자 명시
            // 아이디/비번 틀릴 시 에러 페이지로 리디렉션하지 않기 위해 redirect: false

            setSubmitting(true)
            const res = await signIn('credentials', {
              redirect: false,
              email: values.email,
              password: values.password,
              tenantKey: values.tenantKey,
              callbackUrl: `${window.location.origin}`,
            }) // [...nextauth].js > providers > CredentialsProvider > authorize 실행

            console.log(res)

            if (res.error) {
              setServerMsg(res.error)
              setSubmitting(false)
            } else {
              setSubmitting(false)
              Router.push(res.url)
            }
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
              {fields.map((field, i) => (
                <div key={i}>
                  <div className="flex items-baseline">
                    {field.icon}
                    <input
                      autoFocus={errors[field.type] && touched[field.type]}
                      type={field.type}
                      name={field.type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values[field.type]}
                      className="inputBorderBottomBlue mt-3"
                      placeholder={field.placeholder}
                    />
                  </div>
                  <p className="alertTextSm ml-7">
                    {errors[field.type] &&
                      touched[field.type] &&
                      errors[field.type]}
                  </p>
                </div>
              ))}

              <span className="mt-3 w-fit cursor-pointer rounded-md bg-gray-100 py-1 px-2 text-xs text-gray-500 hover:bg-red-50">
                ⚠️ 이메일 혹은 비밀번호를 잊으셨나요?
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btnFullBlue mt-3"
              >
                로그인
              </button>
            </form>
          )}
        </Formik>

        <Or bg="bg-white" />

        <div className="flex flex-col gap-7">
          <Link href="/register">
            <button className="btnFullOutlineGray">회원가입</button>
          </Link>
          <button
            onClick={() =>
              // 여기서 callbackUrl은 google oauth callbackUrl이 아니고, 모든 로그인 플로우가 끝났을 때 돌아갈 경로임
              signIn('google', { callbackUrl: 'http://localhost:3000' })
            }
            className="btnFullOutlineGray"
          >
            구글로 시작
          </button>
          <button className="btnFullOutlineGray">페이스북으로 시작</button>
        </div>
      </div>
    </div>
  )
}

export default Login
