import React from 'react'
import {
  AiFillCalendar,
  AiFillCheckCircle,
  AiFillSetting,
  AiOutlineAreaChart,
} from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

const LeftRemote = () => {
  return (
    <div
      id="LeftRemoteContainer"
      className="w-30 sticky flex flex-col md:h-full"
    >
      <div className="relative m-2 flex items-center justify-end gap-x-2 gap-y-8 rounded-lg bg-green-900 p-2 px-3 md:m-0 md:h-full md:flex-col md:justify-start md:rounded-2xl md:px-5 md:py-8">
        <Link href="/">
          <div>
            <AiFillCalendar className="leftRemoteIcon" />
          </div>
        </Link>

        <Link href="/todo">
          <div>
            <AiFillCheckCircle className="leftRemoteIcon" />
          </div>
        </Link>

        <Link href="/statistics">
          <div>
            <AiOutlineAreaChart className="leftRemoteIcon" />
          </div>
        </Link>

        <Link href="/account">
          <div>
            <AiFillSetting className="leftRemoteIcon" />
          </div>
        </Link>

        <div onClick={() => signOut()}>
          <BiLogOut className="leftRemoteIcon ml-4 md:mt-4 md:ml-0" />
        </div>
      </div>
    </div>
  )
}

export default LeftRemote
