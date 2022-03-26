import React from 'react'
import { useSession } from 'next-auth/react'
import { useRecoilStateLoadable, useRecoilValue } from 'recoil'
import { selectedDate, todosData } from '../../store/common'
import { getTodosByCat } from './utils'
import Title from '../micro/Title'
import Item from './Item'
import NewTodo from './NewTodo'
import { dateUtil } from '../../utils'

const Todo = () => {
  const email = useSession().data.user.email
  const date = useRecoilValue(selectedDate)
  const datestamp = dateUtil.dateConverter({ date, to: 'yyyy-mm-dd' })

  const [todos, setTodos] = useRecoilStateLoadable(
    todosData({ email, firstday: datestamp, lastday: datestamp })
  )

  const todosByCat = todos.state === 'hasValue' && getTodosByCat(todos.contents)

  return (
    <>
      <Title title="todo" />

      <section className="bodyContainer">
        <NewTodo datestamp={datestamp} setTodos={setTodos} />

        <div className="overflow-y-auto" style={{ height: '685px' }}>
          {Object.keys(todosByCat).map((categoryName, i) => (
            <div key={i} className="mb-6">
              <div className="mb-2 w-fit rounded-full border border-green-700 px-2 py-1 text-sm text-green-700">
                {categoryName}
              </div>

              {todosByCat[categoryName].map((item, i) => (
                <Item key={i} currentTodo={item} setTodos={setTodos} />
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Todo
