import React, { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useSession } from 'next-auth/react'
import { createTodoReq, getTodos } from '../../apiCalls/todoCalls'
import { selectedDate, todos } from '../../store/common'
import { DEFAULT_COLOR, MEDIUM } from '../../store/constants'
import { getDateStamp } from '../scheduler2/utils'
// import ColorDropdown from '../colors/ColorDropdown'
import Title from '../micro/Title'
import ListItem from './ListItem'

const Todo = () => {
  // selectedDate는 전역 상태 --> 달력에서 날짜를 클릭할 때마다 변경 --> Todo 재렌더 --> useEffect 실행해서 데이터 패치
  const currentDate = useRecoilValue(selectedDate)

  // 데이터를 패치하기 위해서 유저의 이메일 및 yyyy-mm-dd 형식의 날짜가 필요
  const user = useSession().data.user
  const date = getDateStamp(currentDate)

  // 패치한 데이터 저장할 상태
  const [todo, setTodo] = useRecoilState(todos)

  // 데이터 패치
  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos(date, user.email)
      setTodo(todos)
    }

    fetchTodos()
  }, [])

  // 화면 너비에 따라 드롭다운 배경 색상을 다르게 하기 위해서 필요
  const { width } = useWindowSize()

  // 드롭다운에서 선택된 컬러와 카테고리를 저장
  const [color, setColor] = useState(DEFAULT_COLOR)

  // 할일 제목
  const [title, setTitle] = useState('')

  // 할일 생성
  const createTodo = async (e) => {
    e.preventDefault()

    const newTodo = { title, color, done: false, date, email: user.email }
    const createdData = await createTodoReq({ ...newTodo, email: user.email })

    setTodo([...todo, createdData])
    setTitle('')
  }

  console.log(todo)

  return (
    <>
      <Title title="todo" />

      {/* ==================================================================================================================================
        카테고리 선택 및 새 할일 입력창 
      ================================================================================================================================== */}

      <form
        onSubmit={(e) => createTodo(e)}
        className="relative flex flex-col border-t py-5 px-2 md:border-none md:p-5"
      >
        {/* <ColorDropdown
          bg={`${width < MEDIUM ? 'bg-green-300' : 'bg-white'}`}
          color={color}
          setColor={setColor}
        /> */}
        <input
          type="text"
          className="mt-3 rounded-lg border border-gray-400 p-2 text-lg focus:border-2 focus:border-green-700 focus:outline-none"
          placeholder="할 일을 입력 후 Enter 키를 눌러 등록하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>

      {
        /* ===============================================================================================================================
        할일 리스트
        ================================================================================================================================== */

        todo.map((todoItem) => (
          <ListItem {...todoItem} />
        ))
      }
    </>
  )
}

export default Todo
