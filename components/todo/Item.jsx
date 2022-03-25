import React, { useState } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import {
  deleteTodoReq,
  doneTodoReq,
  updateTodoReq,
} from '../../apiCalls/todoCalls'
import { DEFAULT_COLOR } from '../../store/constants'
import ColorDropdown from '../micro/ColorDropdown'
import ModdableItem from '../micro/ModdableItem'
import TodoRecorder from './TodoRecorder'

const Item = ({ currentTodo, setTodos }) => {
  const [updating, setUpdating] = useState(false)
  const [color, setColor] = useState(currentTodo.userColor)

  const dropdownStyle = {
    container:
      'rounded-md items-center  text-green-900 bg-gray-200 md:bg-gray-100 mr-2 text-xs',
    preview: 'flex cursor-pointer items-center border-green-900',
    open: 'overflow-y-auto bg-gray-100 md:bg-gray-50',
  }

  const itemStyle = {
    container: 'flex text-sm p-2 w-full rounded-full',
    btnContainer: 'text-lg text-gray-300',
  }

  const handleSubmit = async (e) => {
    const value = e.target.value

    if (!value.replace(/\s+/g, '')) return

    const { updatedTodo } = await updateTodoReq({
      title: value,
      colorId: color.id,
      todoId: currentTodo.id,
    })

    setTodos((todos) =>
      todos.map((originTodo) =>
        originTodo.id === currentTodo.id ? updatedTodo : originTodo
      )
    )

    setUpdating(false)
  }

  const handleDelete = async () => {
    await deleteTodoReq({ id: currentTodo.id })
    setTodos((todos) =>
      todos.filter((originTodo) => originTodo.id !== currentTodo.id)
    )
  }

  const handleDone = async () => {
    await doneTodoReq({ id: currentTodo.id })
    setTodos((todos) =>
      todos.map((originTodo) =>
        originTodo.id === currentTodo.id
          ? { ...currentTodo, done: !originTodo.done }
          : originTodo
      )
    )
  }

  return (
    <ModdableItem
      style={itemStyle}
      updating={updating}
      setUpdating={setUpdating}
      handleDelete={handleDelete}
    >
      <>
        <AiOutlineCheckCircle
          onClick={handleDone}
          className={`mr-2 cursor-pointer text-lg ${
            currentTodo.done ? 'text-green-700' : 'text-gray-200'
          }`}
          style={{ transform: 'translateY(1px)' }}
        />

        {updating ? (
          <ColorDropdown
            style={dropdownStyle}
            color={color}
            setColor={setColor}
            maxHeight="24px"
          />
        ) : (
          <div className="flex items-center">
            <div
              className="mr-1 h-4 w-4 whitespace-nowrap rounded-full"
              style={{
                backgroundColor:
                  (currentTodo.userColor?.color?.hex || DEFAULT_COLOR.hex) +
                  '4d',
              }}
            />

            <span
              style={{
                color:
                  (currentTodo.userColor?.color?.hex || DEFAULT_COLOR.hex) +
                  '4d',
              }}
            >
              {currentTodo.userColor?.tag || DEFAULT_COLOR.tag}
            </span>
          </div>
        )}

        <div className="mx-2 flex-1">
          {updating ? (
            <input
              type="text"
              autoFocus={true}
              className="inputUnderline flex-1 border-green-700"
              placeholder="수정 후 Enter"
              defaultValue={currentTodo.title}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
            />
          ) : (
            <p className={currentTodo.done ? 'text-gray-300 line-through' : ''}>
              {currentTodo.title}
            </p>
          )}
        </div>

        {!updating && <TodoRecorder todo={currentTodo} color={color} />}
      </>
    </ModdableItem>
  )
}

export default Item
