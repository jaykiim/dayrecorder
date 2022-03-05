import React, { useState } from 'react'
import Modal from './Modal'
import { getMinutehandPos } from './utils'

const Record = ({ order, records, setRecords, dayrecords, loading }) => {
  const [modal, setModal] = useState({ open: false, record: {} })

  return (
    <>
      {!loading &&
        dayrecords?.map((record, i) => {
          const { start, end, title, color } = record

          const top = getMinutehandPos(null, null, start)
          const bottom = getMinutehandPos(null, null, end)
          const height = Math.round(bottom - top)

          return (
            // 컨테이너
            <div
              key={i}
              className="absolute w-full p-1"
              style={{ top: `${top}px` }}
            >
              {/* 박스 */}
              <div
                onClick={() => setModal({ open: true, record })}
                className="bg-gray relative flex cursor-pointer overflow-hidden rounded-md p-1 hover:shadow-lg"
                style={{
                  height: `${height}px`,
                  backgroundColor: color.hex + '32',
                }}
              >
                {/* 인덱스 */}
                <div
                  className="absolute top-0 left-0 h-full w-1"
                  style={{ backgroundColor: color.hex }}
                />
                {/* 타이틀 및 시간 */}
                <div className="pl-1" style={{ color: color.hex }}>
                  <p className="text-xs font-semibold">{title}</p>
                  <p className="text-xs">
                    {start} - {end}
                  </p>
                </div>
              </div>
            </div>
          )
        })}

      {modal.open && (
        <Modal
          dayrecord={modal.record}
          order={order}
          modal={modal}
          setModal={setModal}
          records={records}
          setRecords={setRecords}
        />
      )}
    </>
  )
}

export default Record
