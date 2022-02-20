import Link from 'next/link'
import { Formik } from 'formik'
import { MdOutlineMailOutline, MdOutlinePassword } from 'react-icons/md'
import Or from '../components/micro/Or'

const Login = () => {
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

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-5/6 rounded-md bg-white p-12 md:w-3/5 lg:w-2/5 xl:w-1/4">
        <h1 className="mb-2 text-2xl font-black uppercase">login</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
            }, 400)
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
              {fields.map((field, i) => (
                <div key={i} className="flex items-baseline">
                  {field.icon}
                  <input
                    type={field.type}
                    name={field.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="inputBorderBottomBlue mt-3"
                    placeholder={field.placeholder}
                  />
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
          <button className="btnFullOutlineGray">구글로 시작</button>
          <button className="btnFullOutlineGray">페이스북으로 시작</button>
        </div>
      </div>
    </div>
  )
}

export default Login
