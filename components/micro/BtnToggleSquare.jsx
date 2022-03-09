import React from 'react'

const BtnToggleSquare = ({ toggle, setToggle }) => {
  return (
    <div
      onClick={() => setToggle(!toggle)}
      className="relative flex cursor-pointer rounded-md bg-green-300 py-1 px-1 md:shadow-inner"
    >
      <div
        className={`absolute ${
          toggle ? 'left-1 top-1' : 'translate-x-16'
        } rounded-sm bg-white px-2 font-bold text-carrot-light shadow-sm transition-all`}
      >
        {toggle ? 'Week' : 'Day'}
      </div>
      <div className="mr-2 px-2 text-green-700">Week</div>
      <div className="px-2 text-green-700">Day</div>
    </div>
  )
}

export default BtnToggleSquare
