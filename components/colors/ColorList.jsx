import React from 'react'

const ColorList = ({ selectedFolder }) => {
  return (
    <section className="mt-10">
      <ul>
        {selectedFolder.items.map(({ hex, tag }, i) => (
          <li key={i} className="flex items-center p-3">
            <div
              className="mr-4 h-6 w-6 rounded-full"
              style={{ backgroundColor: hex + '80' }}
            />
            <p>{tag}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ColorList
