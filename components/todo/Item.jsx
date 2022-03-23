import React, { useState } from 'react'
import { AiOutlinePlayCircle } from 'react-icons/ai'
import ReactTooltip from 'react-tooltip'
import { updateTodoReq } from '../../apiCalls/todoCalls'
import { DEFAULT_COLOR } from '../../store/constants'
import ColorDropdown from '../micro/ColorDropdown'
import ModdableItem from '../micro/ModdableItem'

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

  return (
    <ModdableItem
      style={itemStyle}
      updating={updating}
      setUpdating={setUpdating}
    >
      <>
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
            <p>{currentTodo.title}</p>
          )}
        </div>

        {!updating && (
          <div data-tip="시간 기록 시작" className="mr-3 cursor-pointer">
            <ReactTooltip backgroundColor="#e5e5e54d" textColor="#404040" />
            <AiOutlinePlayCircle className="text-xl text-gray-300 hover:text-red-600" />
          </div>
        )}
      </>
    </ModdableItem>
  )
}

export default Item
