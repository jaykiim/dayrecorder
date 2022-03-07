import React, { useState } from 'react'
import { updateUserColorReq } from '../../apiCalls/colorCalls'
import { Formik } from 'formik'
import BtnDelete from '../micro/BtnDelete'
import BtnUpdate from '../micro/BtnUpdate'
import { colorValidate } from './utils'

const ColorList = ({
  user,
  folders,
  defaultFolder,
  selectedFolder,
  setSelectedFolder,
}) => {
  const [updating, setUpdating] = useState({ id: '', state: false })

  const deleteColor = (id) => {
    const newItems = selectedFolder.items.filter((color) => color.uuid !== id)
    const newFolders = folders.map((folder) => {
      if (folder.uuid === selectedFolder.uuid) {
        return {
          ...folder,
          items: newItems,
        }
      }
      return folder
    })

    setSelectedFolder({ ...selectedFolder, items: newItems })
    user.colors.folders = newFolders
    updateUserColorReq(user.email, { folders: newFolders, defaultFolder })
  }

  const updateColor = (values) => {
    const { hex, tag } = values

    const updatedItems = selectedFolder.items.map((color) => {
      if (color.uuid === updating.id) return { ...color, hex, tag }
      return color
    })

    const updatedFolders = folders.map((folder) => {
      if (folder.uuid === selectedFolder.uuid)
        return { ...folder, items: updatedItems }
      return folder
    })

    setSelectedFolder({ ...selectedFolder, items: updatedItems })
    setUpdating({ id: '', state: false })
    user.colors.folders = updatedFolders

    updateUserColorReq(user.email, { folders: updatedFolders, defaultFolder })
  }

  const tags = selectedFolder.items.map(({ tag }) => tag)
  const hexes = selectedFolder.items.map(({ hex }) => hex)

  return (
    <section className="mt-10">
      <ul>
        {selectedFolder.items.map(({ hex, tag, uuid }, i) => (
          <Formik
            key={i}
            initialValues={{ hex, tag }}
            onSubmit={updateColor}
            validationSchema={() => colorValidate('update', tags, hexes)}
          >
            {({ handleChange, handleSubmit, values, handleBlur, errors }) => (
              <li className="flex justify-between p-3">
                <div className="flex items-center">
                  <div
                    className="mr-4 h-6 w-6 rounded-full"
                    style={{ backgroundColor: hex + '80' }}
                  />
                  {updating.state && updating.id === uuid ? (
                    <div>
                      <form
                        className="flex gap-x-3"
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                      >
                        <input
                          id="hex"
                          name="hex"
                          type="text"
                          autoFocus={true}
                          className="w-20 border-b focus:border-b-2 focus:outline-none"
                          style={{ borderColor: hex }}
                          value={values.hex}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <input
                          id="tag"
                          name="tag"
                          type="text"
                          className="w-full border-b focus:border-b-2 focus:outline-none"
                          style={{ borderColor: hex }}
                          value={values.tag}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </form>
                      <p className="alertTextSm translate-y-2">
                        {errors.hex || errors.tag}
                      </p>
                    </div>
                  ) : (
                    <p>{tag}</p>
                  )}
                </div>

                <div className="flex gap-x-3">
                  <BtnUpdate
                    updating={updating}
                    setUpdating={setUpdating}
                    id={uuid}
                    cb={handleSubmit}
                  />
                  <BtnDelete
                    updating={updating}
                    setUpdating={setUpdating}
                    id={uuid}
                    cb={deleteColor}
                  />
                </div>
              </li>
            )}
          </Formik>
        ))}
      </ul>
    </section>
  )
}

export default ColorList
