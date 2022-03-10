import React, { useState } from 'react'
import { MIN_HEIGHT } from '../../store/constants'
import { convertToMin } from '../scheduler/utils'
import RecordEditModal from './RecordEditModal'

const Record = (props) => {
  const { userColor, start, end, title } = props

  const top = convertToMin(start) * MIN_HEIGHT + 'px'
  const height = (convertToMin(end) - convertToMin(start)) * MIN_HEIGHT + 'px'

  const style = {
    absoluteContainer: {
      position: 'absolute',
      top,
      padding: '5px',
      width: '100%',
    },
    recordBox: {
      display: 'flex',
      height,
    },
    boxLeft: {
      width: '7px',
      backgroundColor: userColor || '#e5e5e5',
    },
    boxRight: {
      width: '100%',
      padding: '4px 8px',
      backgroundColor: userColor?.hex || '#e5e5e5' + '4d',
      color: userColor?.hex || '#d4d4d4',
    },
  }

  const [modal, setModal] = useState(false)

  return (
    <>
      <div style={style.absoluteContainer}>
        <div
          style={style.recordBox}
          onClick={() => setModal(!modal)}
          className="cursor-pointer rounded-lg hover:shadow-lg"
        >
          <div style={style.boxLeft} className="rounded-l-lg" />
          <div style={style.boxRight} className="overflow-hidden rounded-r-lg">
            <p className="font-bold">{title}</p>
            <p className="text-xs">
              {start} ~ {end}
            </p>
          </div>
        </div>
      </div>

      {modal && (
        <RecordEditModal modal={modal} setModal={setModal} recordData={props} />
      )}
    </>
  )
}

export default Record
