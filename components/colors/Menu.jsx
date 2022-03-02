import React, { useState } from 'react'
import Dropdown from '../micro/Dropdown'
import MenuItem from './MenuItem'
import NewFolder from './NewFolder'

const Menu = (props) => {
  const [open, setOpen] = useState(false)

  const renderList = () => (
    <>
      <div className={`mt-3 h-36 overflow-y-scroll ${!open && 'hidden'}`}>
        {props.folders.map((folder, i) => (
          <MenuItem key={i} {...{ ...props, currentFolder: folder }} />
        ))}
      </div>
      <NewFolder {...props} />
    </>
  )

  return (
    <section className="flex items-center">
      <Dropdown
        open={open}
        setOpen={setOpen}
        header={props.selectedFolder.folderName}
        origin="10"
        stretched="64"
        cb={renderList}
        style={{
          common: 'w-full rounded-lg md:bg-green-300',
          open: 'bg-green-500',
          notOpen: '',
        }}
      />
    </section>
  )
}

export default Menu
