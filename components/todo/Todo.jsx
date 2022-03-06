import { useSession } from 'next-auth/react'
import React from 'react'
import { useState } from 'react'
import { useWindowSize } from 'react-use'
import { useRecoilValue } from 'recoil'
import { createTodoReq } from '../../apiCalls/todoCalls'
import { selectedDate } from '../../store/common'
import { DEFAULT_COLOR, MEDIUM } from '../../store/constants'
import { getDateStamp } from '../scheduler/utils'
import ColorDropdown from '../colors/ColorDropdown'

const Todo = () => {
  const user = useSession().data.user
  const currentDate = useRecoilValue(selectedDate)
  const date = getDateStamp(currentDate)

  const { width } = useWindowSize()
  const [color, setColor] = useState(DEFAULT_COLOR)
  const [title, setTitle] = useState('')

  const createTodo = (e) => {
    e.preventDefault()

    const newTodo = { title, color, done: false, date, email: user.email }
    createTodoReq({ ...newTodo, email: user.email })
  }

  return (
    <>
      <h1
        className={`${
          width < 768 && 'hidden'
        } border-b border-green-300 p-4 px-5 text-xl font-black uppercase`}
      >
        Todo
      </h1>

      <form
        onSubmit={(e) => createTodo(e)}
        className="relative flex flex-col border-t py-5 px-2 md:border-none md:p-5"
      >
        <ColorDropdown
          bg={`${width < MEDIUM ? 'bg-green-300' : 'bg-white'}`}
          color={color}
          setColor={setColor}
        />
        <input
          type="text"
          className="mt-3 rounded-lg border border-gray-400 p-2 text-lg focus:border-2 focus:border-green-700 focus:outline-none"
          placeholder="할 일을 입력 후 Enter 키를 눌러 등록하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
    </>
  )
}

export default Todo
