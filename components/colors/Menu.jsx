import React, { useState } from 'react'
import { AiOutlineDownCircle } from 'react-icons/ai'

const folderNames = ['기본', '어쩌구', '저쩌구']

const Menu = ({ setSelectedFolder }) => {
  const [open, setOpen] = useState(false)
  console.log(open)

  return (
    <section className="flex items-center">
      <div
        className={`mr-2 h-56 max-h-10 flex-1 rounded-lg py-2 px-3 transition-all md:bg-green-300 ${
          open && 'max-h-56 bg-green-500'
        }`}
      >
        <div className="flex items-center justify-between">
          <span>Menu</span>
          <AiOutlineDownCircle
            onClick={() => setOpen(!open)}
            className="cursor-pointer text-xl text-gray-400"
          />
        </div>

        <div className={`mt-3 pt-3`}>
          {open &&
            folderNames.map((name, i) => (
              <div
                key={i}
                className="cursor-pointer rounded-lg border-t p-2 hover:bg-green-500 "
              >
                {name}
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default Menu
