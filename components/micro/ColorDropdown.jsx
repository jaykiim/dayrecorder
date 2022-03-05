import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai'

const ColorDropdown = () => {
  const colors = useSession().data.user.colors
  const folderNames = Object.keys(colors)

  const [open, setOpen] = useState(false)
  const [subOpen, setSubOpen] = useState({ name: '', state: false })
  const [selectedColor, setSelectedColor] = useState({ tag: '', hex: '' })

  console.log(colors[subOpen.name])

  return (
    <div
      className={`my-3 h-52 rounded-lg ${
        open ? 'max-h-52' : 'max-h-7'
      } bg-gray-50 pl-2 transition-all`}
    >
      <div className="h-52 overflow-y-scroll">
        <section className="flex items-center justify-between p-1">
          <div className="flex items-center text-sm">
            <div
              className="mr-3 h-4 w-4 rounded-full"
              style={{ backgroundColor: selectedColor.hex + '80' }}
            />
            <p>{selectedColor.tag}</p>
          </div>

          <AiFillCaretDown onClick={() => setOpen(!open)} />
        </section>

        <ul className={` ${!open && 'hidden'} p-1 text-sm`}>
          {folderNames.map((name, i) => (
            <li
              key={i}
              className={`cursor-pointer transition-all ${
                subOpen.state && subOpen.name === name
                  ? 'max-h-full'
                  : 'max-h-7'
              } py-1 `}
            >
              <section
                onClick={() => setSubOpen({ name, state: !subOpen.state })}
                className="flex items-center hover:bg-gray-100"
              >
                <AiFillCaretDown className="text-gray-300" />
                <p className="p-1">{name}</p>
              </section>

              {subOpen.state && subOpen.name === name && (
                <ul className="pl-2">
                  {colors[subOpen.name].map(({ hex, tag }, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setSelectedColor({ tag, hex })
                        setOpen(false)
                      }}
                      className="flex items-center py-1 hover:bg-gray-100"
                    >
                      <div
                        className="mr-4 h-4 w-4 rounded-full"
                        style={{ backgroundColor: hex + '80' }}
                      />
                      <p>{tag}</p>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ColorDropdown
