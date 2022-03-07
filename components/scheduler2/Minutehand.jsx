import React, { useEffect } from 'react'
import useMinutehand from '../../hooks/useMinutehand'

const Minutehand = ({ today, minhandPos }) => {
  const timer = useMinutehand()

  useEffect(() => {
    return () => clearTimeout(timer)
  }, [timer])

  const indicatorContainer = {
    position: 'absolute',
    width: '100%',
    top: `${minhandPos}px`,
  }

  const indicator = {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    transform: 'translateY(-0.5px)',
  }
  const thickBar = {
    width: '100%',
    height: '2px',
    backgroundColor: '#F08D72',
  }

  return (
    <div style={indicatorContainer}>
      {!today && <hr className="w-full border-dashed border-carrot-light" />}
      {today && (
        <div style={indicator}>
          <div className="absolute -left-1 h-4 w-4 rounded-full bg-carrot-light opacity-30" />
          <div className="absolute h-2 w-2 rounded-full bg-carrot-light" />
          <div style={thickBar} />
        </div>
      )}
    </div>
  )
}

export default Minutehand
