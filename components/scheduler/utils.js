import * as Yup from 'yup'

/* 
============================================================================================================ 
DO :: 날짜 포맷터 
============================================================================================================ 
*/

export const dateFormatter = (year, month, day) => {
  if (typeof day === 'string') {
    const [prefix, date] = day.split('.')
    prefix === 'prev' ? month-- : month++
    day = date
  }

  if (Number(month) < 10) month = '0' + month
  if (Number(day) < 10) day = '0' + day

  return `${year}-${month}-${day}`
}

/* 
============================================================================================================ 
  DO :: 날짜 스탬프 생성
============================================================================================================ 
*/

export const getDateStamp = (date) => {
  const { year, month, day } = dateObj(date)
  return dateFormatter(year, month, day)
}

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
  DO :: hour (문자열) ---> min (숫자)
============================================================================================================ 
*/

export const convertToMin = (timestamp) => {
  const [hour, min] = timestamp.split(':')
  return Number(hour) * 60 + Number(min)
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

/* 
============================================================================================================ 
  DO :: 레코드 에디터 유효성 검사
============================================================================================================ 
*/

export const recordValidate = Yup.object({
  start: Yup.string()
    .matches(
      /^(0[0-9]|1[0-9]|2[0-4]):(0[0-9]|[1-5][0-9])$/g,
      '시간을 xx:xx 형식으로 입력해주세요'
    )
    .required('시작 시각을 입력해주세요'),
  end: Yup.string().required('종료 시각을 입력해주세요'),
})
