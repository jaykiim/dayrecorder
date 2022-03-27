export const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/* 
============================================================================================================ 
  DO :: 날짜 포맷 변환
============================================================================================================ 
*/

export const dateConverter = ({ date, to }) => {
  if (typeof date?.getMonth === 'function') {
    //
    // ? Date 객체 ---> yyyy-mm-dd
    if (to === 'yyyy-mm-dd') {
      const plainObject = dateInstanceToPlainObject(date)
      return dateObjectToDatestamp(plainObject)
    }

    // ? Date 객체 ---> 일반 객체
    if (to === 'object') return dateInstanceToPlainObject(date)
  }

  //
  else if (typeof date === 'object') {
    //
    // ? 일반 객체 (with String 일자) ---> 일반 객체
    if (to === 'object') return dateObjectCorrection(date)

    // ? 일반 객체 ---> Date 인스턴스
    if (to === 'dateInstance') {
      const { year, month, date } = dateObjectCorrection(date)
      return new Date(`${year}-${month}-${date}`)
    }

    // ? 일반 객체 ---> yyyy-mm-dd
    if (to === 'yyyy-mm-dd') {
      return dateObjectToDatestamp(dateObjectCorrection(date))
    }
  }

  // ? yyyy-mm-dd ---> 일반 객체
  else if (typeof date === 'string') return dateStampToPlainObject(date)
  //
  else return 'no'
}

// Date 인스턴스 ---> { year, month, date, weekday}
const dateInstanceToPlainObject = (date) => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  date: date.getDate(),
  weekday: WEEK_DAYS[date.getDay()],
})

// 일반 객체 ---> yyyy-mm--dd
const dateObjectToDatestamp = ({ year, month, date }) => {
  if (month < 10) month = '0' + month
  if (date < 10) date = '0' + date
  return `${year}-${month}-${date}`
}

// 일자가 next. 또는 prev. 인 일반 객체 ---> 수정된 일반 객체
const dateObjectCorrection = (dateObject) => {
  let { year, month, date } = dateObject
  let dateInstance = new Date(`${year}-${month}-${date}`)

  if (typeof date === 'string') {
    const [prefix, num] = date.split('.')

    if (prefix === 'next') {
      if (month === 12) {
        year = +year + 1
        month = 1
      } else month = +month + 1
    } else {
      if (month === 1) {
        year = year - 1
        month = 12
      } else month = month - 1
    }

    dateInstance = new Date(`${year}-${month}-${num}`)
  }

  return dateInstanceToPlainObject(dateInstance)
}

// 날짜 스탬프 ---> 일반 객체
const dateStampToPlainObject = (datestamp) => {
  const [year, month, date] = datestamp.split('-').map((num) => +num)
  return dateObjectToDatestamp({ year, month, date })
}

/* 
============================================================================================================ 
  DO :: 월별 날짜
============================================================================================================ 
*/

const isLeapYear = (year) => {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) return true
  else return false
}

export const daysOfMonth = ({
  dateInstance,
  currentMonth,
  firstLast,
  datestamp,
}) => {
  const { year, month } = dateConverter({ date: dateInstance, to: 'object' })

  const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (isLeapYear(year)) daysPerMonth[1] = 29 // 윤년이면 2월을 29일까지로

  let days = []

  // ? 시작일 전까지 전월 날짜로 채우기 ===================================

  if (!currentMonth) {
    // 현재 달의 시작 요일 구하기
    const weekdayNo = new Date(`${year}-${month}-01`).getDay() // 월요일이면 1, 화요일이면 2, ...

    for (let i = 0; i < weekdayNo; i++) {
      // 전월 마지막 날짜, 전월 마지막 날짜 - 1, 전월 마지막 날짜 - 2, ... 의 역순
      // 그런데 1월이면 12월의 마지막 날짜, ... 의 역순
      if (month < 2)
        days.push(
          'prev.' + (daysPerMonth[daysPerMonth.length - 1] - weekdayNo + i + 1)
        )
      else days.push('prev.' + (daysPerMonth[month - 2] - weekdayNo + i + 1))
    }
  }

  // ? 월별 일수에 맞게 날짜 채우기 =============================

  for (let i = 1; i <= daysPerMonth[month - 1]; i++) days.push(i)

  // ? 남은 빈 칸을 다음날 날짜로 채우기 ===================================

  if (!currentMonth) {
    const remained = 7 - (days.length % 7)
    if (remained < 7)
      for (let i = 0; i < remained; i++) days.push('next.' + (i + 1))
  }

  if (firstLast) days = [days[0], days[days.length - 1]]

  if (datestamp) {
    days = days.map((date) =>
      dateConverter({ date: { year, month, date }, to: 'yyyy-mm-dd' })
    )
  }

  return days
}

/* 
============================================================================================================ 
  DO :: 주별 날짜 
============================================================================================================ 
*/

export const daysOfSameWeek = ({
  dateInstance,
  currentMonth,
  datestamp,
  firstLast,
}) => {
  const { year, month, date } = dateConverter({
    date: dateInstance,
    to: 'object',
  })

  const allDates = daysOfMonth({ dateInstance })
  const allWeeks = []

  for (let i = 0; i < 6; i++) {
    allWeeks.push(allDates.splice(0, 7))
  }

  let weekNo = -1
  allWeeks.find((week, i) => {
    weekNo = i
    return week.includes(date)
  })

  let result = allWeeks[weekNo]

  if (currentMonth) {
    result = result.filter((date) => typeof date === 'number')
  }

  if (firstLast) {
    result = [result[0], result[result.length - 1]]
  }

  if (datestamp) {
    result = result.map((date) =>
      dateConverter({ date: { year, month, date }, to: 'yyyy-mm-dd' })
    )
  }

  return result
}

export default { WEEK_DAYS, dateConverter, daysOfMonth, daysOfSameWeek }
