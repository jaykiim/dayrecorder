import React, { useState } from 'react'
import Title from '../micro/Title'
import PasswordConfirm from './PasswordConfirm'
import PasswordChange from './PasswordChange'

const Password = () => {
  const [pass, setPass] = useState(false)

  return (
    <>
      <Title title="Password" />
      <div className="bodyContainer items-center md:items-start">
        <div className="w-96 rounded-md bg-white p-7 text-sm">
          {pass ? (
            <PasswordChange setPass={setPass} />
          ) : (
            <PasswordConfirm setPass={setPass} />
          )}
        </div>
      </div>
    </>
  )
}

export default Password
