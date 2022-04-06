import React, { useState } from 'react'
import Title from '../micro/Title'
import PasswordConfirm from './PasswordConfirm'
import Phone from './Phone'

const Verification = () => {
  const [pass, setPass] = useState(false)

  return (
    <>
      <Title title="Verification" />
      <div className="bodyContainer items-center md:items-start">
        {pass ? (
          <Phone />
        ) : (
          <div className="w-96 rounded-md bg-white p-7 text-sm">
            <PasswordConfirm setPass={setPass} />
          </div>
        )}
      </div>
    </>
  )
}

export default Verification
