import React from 'react'
import uuid from 'react-uuid'
import { Formik } from 'formik'
import { useWindowSize } from 'react-use'
import { LARGE, MEDIUM, SMALL } from '../../store/constants'
import NewColor from './NewColor'
import { colorValidate } from './utils'
import { updateUserColorReq } from '../../apiCalls/colorCalls'

const ColorForm = ({
  userId,
  folders,
  setFolders,
  selectedFolder,
  defaultFolder,
}) => {
  const { width } = useWindowSize()

  // 라지모바일 or 데스크탑
  const flex = (SMALL <= width && width < MEDIUM) || width >= LARGE

  const tags = selectedFolder.items.map(({ tag }) => tag)
  const hexes = selectedFolder.items.map(({ hex }) => hex)

  const addNewColor = async (values, { setSubmitting, setValues }) => {
    setSubmitting(true)

    const newColor = { hex: values.hex, tag: values.tag, uuid: uuid() }
    const newFolders = folders.map((folder) => {
      if (folder.uuid === selectedFolder.uuid) folder.items.push(newColor)
      return folder
    })

    setFolders(newFolders)
    setValues({ hex: '', tag: '' })

    await updateUserColorReq(userId, { folders: newFolders, defaultFolder })

    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={{ hex: '', tag: '' }}
      validationSchema={() => colorValidate('new', tags, hexes)}
      onSubmit={addNewColor}
    >
      {(props) => (
        <>
          <form
            onSubmit={props.handleSubmit}
            onKeyDown={(e) => e.key === 'Enter' && props.handleSubmit()}
            className={`mt-3 ${flex && 'mt-5 flex'} shadow-lg`}
          >
            <NewColor {...{ ...props, flex }} />
          </form>
          <p className="reference">
            * 실제 화면에 표시될 색상과 동일합니다 (투명도가 적용되어있음)
          </p>
          <p className="alertTextSm mt-2">
            {props.errors.hex || props.errors.tag}
          </p>
        </>
      )}
    </Formik>
  )
}

export default ColorForm
