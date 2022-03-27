import React, { useState } from 'react'
import {
  deleteUserColorReq,
  updateUserColorReq,
} from '../../apiCalls/colorCalls'
import { validate } from '../../utils'
import Form from '../micro/Form'
import ModdableItem from '../micro/ModdableItem'

const ColorListItem = ({
  colorInfo,
  selectedCategoryId,
  categories,
  setCategories,
}) => {
  const [updating, setUpdating] = useState(false)

  const fields = [
    { id: 'updateHex', label: 'hex' },
    { id: 'updateTag', label: 'tag' },
  ]

  const handleSubmit = async (values) => {
    const { updateHex: hex, updateTag: tag } = values

    if (!hex.replace(/\s+/g, '') || !tag.replace(/\s+/g, '')) return

    const { userCategory } = await updateUserColorReq({
      hex,
      tag,
      id: colorInfo.id,
    })

    const newCategories = categories.map((item) =>
      item.id === selectedCategoryId ? userCategory : item
    )

    setCategories(newCategories)
    setUpdating(false)
  }

  const handleDelete = async () => {
    await deleteUserColorReq(colorInfo.id)
    const newCategories = categories.map((category) =>
      category.id === selectedCategoryId
        ? {
            ...category,
            userColors: category.userColors.filter(
              (elem) => elem.id !== colorInfo.id
            ),
          }
        : category
    )
    setCategories(newCategories)
    setUpdating(false)
    // console.log(newCategories)
  }

  return (
    <ModdableItem
      updating={updating}
      setUpdating={setUpdating}
      handleDelete={handleDelete}
      style="flex text-green-900"
    >
      <div className="flex w-full items-center">
        <div
          className="mr-4 h-5 w-5 rounded-full"
          style={{ backgroundColor: colorInfo.color.hex + '4d' }}
        />

        {updating ? (
          <Form
            values={{
              updateHex: colorInfo.color.hex,
              updateTag: colorInfo.tag,
            }}
            style="flex-1 mr-8 relative text-sm"
            handleSubmit={handleSubmit}
            validate={validate.color('updateHex', 'updateTag')}
          >
            {({ values, handleChange, errors, handleSubmit }) => (
              <>
                <div className="flex gap-x-6">
                  {fields.map(({ id, label }, i) => (
                    <div key={i} className="flex items-center">
                      <label htmlFor={id} className="mr-2 font-bold uppercase">
                        {label}
                      </label>
                      <input
                        type="text"
                        id={id}
                        className="inputUnderline"
                        value={values[id]}
                        onChange={handleChange}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                      />
                    </div>
                  ))}
                </div>
                <p className="alertTextSm mt-1">
                  {errors.updateHex || errors.updateTag}
                </p>
              </>
            )}
          </Form>
        ) : (
          <p className="text-sm">{colorInfo.tag}</p>
        )}
      </div>
    </ModdableItem>
  )
}

export default ColorListItem
