import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Dropdown from '../micro/Dropdown'
import ColorChip from './ColorChip'

const ColorDropdown = ({ bg, color, setColor }) => {
  const folders = useSession().data.user.colors.folders

  const [open, setOpen] = useState(false)
  const [subOpen, setSubOpen] = useState({ id: '', state: false })

  const renderColorChip = () => <ColorChip colorInfo={color} />

  const renderSubList = (folder, id) =>
    id === subOpen.id && (
      <div className="">
        {folder.items.map(({ hex, tag, uuid }) => (
          <ColorChip
            cb={() => {
              setColor({ folder: folder.uuid, hex, tag, uuid })
              setOpen(false)
            }}
            key={uuid}
            colorInfo={{ folder: folder.uuid, hex, tag, uuid }}
          />
        ))}
      </div>
    )

  const renderList = () => (
    <div>
      {folders.map((folder) => (
        <Dropdown
          key={folder.uuid}
          id={folder.uuid}
          open={subOpen}
          setOpen={setSubOpen}
          header={folder.folderName}
          style={{
            open: '',
            common: 'font-normal border-b text-sm p-2',
            notOpen: '',
            listItem: 'font-normal',
          }}
          origin="10"
          stretched="full"
          cb={(id) => renderSubList(folder, id)}
        />
      ))}
    </div>
  )

  return (
    <Dropdown
      open={open}
      setOpen={setOpen}
      header={renderColorChip()}
      origin="10"
      stretched="64"
      cb={renderList}
      style={{
        open: 'overflow-y-auto',
        common: `${bg ? bg : 'bg-gray-50'} rounded-lg p-1 px-2`,
        notOpen: '',
        listItem: 'font-bold',
      }}
    />
  )
}

export default ColorDropdown
