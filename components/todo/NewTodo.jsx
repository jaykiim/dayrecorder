import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { todoCalls } from '../../apiCalls'
import ColorDropdown from '../micro/ColorDropdown'

const NewTodo = ({ datestamp, setTodos }) => {
  const user = useSession().data.user
  const [color, setColor] = useState(user.categories[0].userColors[0])

  const dropdownStyle = {
    container:
      'rounded-lg border border-green-500 text-green-900 mb-4 bg-transparent',
    preview:
      'flex cursor-pointer items-center px-2 border-green-900 font-bold text-sm',
    open: 'overflow-y-auto',
  }

  const handleSubmit = async (e) => {
    const title = e.target.value

    if (!title.replace(/\s+/g, '')) return

    const { newTodo } = await todoCalls.createTodoReq({
      title,
      date: datestamp,
      colorId: color.id,
      email: user.email,
    })

    setTodos((todos) => [...todos, newTodo])
    e.target.value = ''
  }

  return (
    <div className="mb-6 border-b border-dashed pb-6">
      <ColorDropdown color={color} setColor={setColor} style={dropdownStyle} />
      <input
        type="text"
        placeholder="할 일을 입력 후 Enter 로 등록하세요"
        className="inputBorder rounded-lg border-green-700 p-2"
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
      />
    </div>
  )
}

export default NewTodo
