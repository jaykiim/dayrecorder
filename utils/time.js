/* 
============================================================================================================ 
  DO :: 현재 시각 
============================================================================================================ 
*/

import { ONE_MINUTE_HEIGHT } from '../store/constants'

const getCurrentTime = () => {
  let [hr, min] = [new Date().getHours(), new Date().getMinutes()]
  if (hr.toString().length < 2) hr = '0' + hr
  if (min.toString().length < 2) min = '0' + min
  return `${hr}:${min}`
}

/* 
============================================================================================================ 
  DO :: 분침
============================================================================================================ 
*/

const getMinutehandPos = (hr, min, timestr) => {
  // top에서부터 몇 픽셀 지점에 위치해야하는지 계산하여 리턴
  // ===> 현재 시각을 분 단위로 바꾼 뒤 ONE_MINUTE_HEIGHT 를 곱해준다
  if (timestr) {
    const [hr, min] = timestr.split(':')
    return (hr * 60 + Number(min)) * ONE_MINUTE_HEIGHT
  }
  return (hr * 60 + Number(min)) * ONE_MINUTE_HEIGHT
}

/* 
============================================================================================================ 
  DO :: hour (문자열) ---> min (숫자)
============================================================================================================ 
*/

const convertToMin = (timestamp) => {
  const [hour, min] = timestamp.split(':')
  return Number(hour) * 60 + Number(min)
}

/* 
============================================================================================================ 
  DO :: 타임라인 
============================================================================================================ 
*/

const getTimeline = () => {
  const timeline = ['00:00', '00:30']

  for (let i = 1; i < 24; i++) {
    let time = i < 10 ? '0' + i : i
    timeline.push(`${time}:00`)
    timeline.push(`${time}:30`)
  }

  return timeline
}

export default { getCurrentTime, getMinutehandPos, convertToMin, getTimeline }
