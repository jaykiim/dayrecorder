import * as Yup from 'yup'
import { dateObj, getMonthlyDate } from '../calendar/utils'
import { ONE_MINUTE_HEIGHT } from '../../store/constants'
import { dateUtil } from '../../utils'

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

/* 
============================================================================================================ 
  DO :: 전날
============================================================================================================ 
*/

export const getPrevDate = (dateInstance) => {
  const { year, month, date } = dateUtil.dateConverter({
    date: dateInstance,
    to: 'object',
  })

  // 1일인 경우
  if (date === 1) {
    // 1월 1일인 경우
    if (month === 1) {
      // const x = dateUtil.dateConverter({
      //   date: { year: 2021, month: 12, date: 1 },
      //   to: 'dateInstance',
      // })

      // console.log(x)

      const lastYearLastMonth = getMonthlyDate(year - 1, 12).filter(
        (date) => typeof date === 'number'
      )

      // new Date에 단일 인자로 타임스탬프를 주는게 아니라 연,월,일을 줄 경우 month는 0부터 시작하므로 12월은 11임
      return new Date(
        year - 1,
        11,
        lastYearLastMonth[lastYearLastMonth.length - 1]
      ) // 전년 12월 마지막날
    }

    // 2 ~ 12월 1일인 경우
    else {
      const prevMonth = getMonthlyDate(year, month - 1).filter(
        (date) => typeof date === 'number'
      )

      // 이전달이 만약 10월이면 9월을 리턴해야하니까 8이므로 month - 2
      return new Date(year, month - 2, prevMonth[prevMonth.length - 1]) // 전월 마지막날
    }
  }

  // 1일 아닌 경우
  else return new Date(year, month - 1, date - 1)
}

/* 
============================================================================================================ 
  DO :: 다음날
============================================================================================================ 
*/

export const getNextDate = (dateInstance) => {
  const { year, month, day } = dateObj(dateInstance)
  const lastday = getMonthlyDate(year, month).filter(
    (date) => typeof date === 'number'
  )

  // 마지막 날인 경우
  if (day === lastday) {
    // 12월 31일인 경우
    if (month === 12) return new Date(year + 1, 0, 1)
    // 1 ~ 11월 마지막 날인 경우 (만약 month = 2면 3월을 리턴해야하므로 new Date에 2를 줘야 함)
    else return new Date(year, month, 1)
  }

  // 마지막 날이 아닌 경우
  else return new Date(year, month - 1, day + 1)
}

/* 
============================================================================================================ 
  DO :: 분침
============================================================================================================ 
*/

export const getMinutehandPos = (hr, min, timestr) => {
  // top에서부터 몇 픽셀 지점에 위치해야하는지 계산하여 리턴
  // ===> 현재 시각을 분 단위로 바꾼 뒤 ONE_MINUTE_HEIGHT 를 곱해준다
  if (timestr) {
    const [hr, min] = timestr.split(':')
    return (hr * 60 + Number(min)) * ONE_MINUTE_HEIGHT
  }
  return (hr * 60 + Number(min)) * ONE_MINUTE_HEIGHT
}
