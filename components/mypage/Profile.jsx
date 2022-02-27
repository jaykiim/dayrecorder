import React from 'react'
import Image from 'next/image'

const Profile = ({ user }) => {
  return (
    <div className="flex w-full flex-col items-center border-b py-4 tracking-wide">
      {user.image && (
        <Image
          src={user.image}
          alt="user profile image"
          width={100}
          height={100}
          className="rounded-full opacity-80"
        />
      )}
      <h1 className="mt-4 text-center text-xl font-black text-green-900">
        {user.name}
      </h1>
      <p className="text-sm text-green-700">{user.email}</p>
    </div>
  )
}

export default Profile
