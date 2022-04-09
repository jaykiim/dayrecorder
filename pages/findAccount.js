import { useState } from 'react'
import EnterCode from '../components/account/EnterCode'
import FindMyAccount from '../components/account/FindMyAccount'
import ResetPassword from '../components/account/ResetPassword'
import SetNewPassword from '../components/account/SetNewPassword'

const STEPS = ['findMyAccount', 'resetPassword', 'enterCode', 'setNewPassword']

const findAccount = () => {
  const [step, setStep] = useState(0)
  const [user, setUser] = useState(null)

  return (
    <div className="relative flex h-screen items-center justify-center bg-gray-100">
      <div className="w-5/6 rounded-md bg-white py-10 px-8 xl:w-1/4">
        {step === 0 ? (
          <FindMyAccount setUser={setUser} setStep={setStep} />
        ) : step === 1 ? (
          <ResetPassword user={user} setUser={setUser} setStep={setStep} />
        ) : step === 2 ? (
          <EnterCode user={user} setStep={setStep} />
        ) : step === 3 ? (
          <SetNewPassword user={user} />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default findAccount
