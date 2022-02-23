/* 
============================================================================================================ 
  DO :: 타임라인 
============================================================================================================ 
*/

export const getTimeline = () => {
  const timeline = ['00:00', '00:30']

  for (let i = 1; i < 24; i++) {
    let time = i < 10 ? '0' + i : i
    timeline.push(`${time}:00`)
    timeline.push(`${time}:30`)
  }

  return timeline
}

/* 
============================================================================================================ 
  DO :: 분침 
============================================================================================================ 
*/

export const MINUTEHAND_MOVEMENT = 3.2 // 분당 3.2px 씩 하강 (현재 UI에서 1시간의 높이가 192px이므로)
export const getMinutehandPos = (hr, min) => {
  // top에서부터 몇 픽셀 지점에 위치해야하는지 계산하여 리턴
  // ===> 현재 시각을 분 단위로 바꾼 뒤 MINUTEHAND_MOVEMENT 를 곱해준다
  return (hr * 60 + Number(min)) * MINUTEHAND_MOVEMENT
}

/* 
============================================================================================================ 
  DO :: 현재 시각 
============================================================================================================ 
*/

export const getCurrentTime = () => {
  let [hr, min] = [new Date().getHours(), new Date().getMinutes()]
  if (hr.toString().length < 2) hr = '0' + hr
  if (min.toString().length < 2) min = '0' + min
  return `${hr}:${min}`
}
