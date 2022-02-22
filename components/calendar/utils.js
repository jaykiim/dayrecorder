const WEEK_DAYS_KO = ['일', '월', '화', '수', '목', '금', '토']
const WEEK_DAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const dateObj = (date, lan) => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
  weekday:
    lan === 'ko' ? WEEK_DAYS_KO[date.getDay()] : WEEK_DAYS_EN[date.getDay()],
})

const isLeapYear = (year) => {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) return true
  else return false
}

const getMonthlyDate = (year, month) => {
  const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (isLeapYear(year)) daysPerMonth[1] = 29 // 윤년이면 2월을 29일까지로

  const days = []

  // * 시작일 전까지 전월 날짜로 채우기 ===================================

  // 현재 달의 시작 요일 구하기
  if (month < 10) month = '0' + month
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

  // * 시작일부터 월별 일수에 맞게 날짜 채우기 =============================

  for (let i = 1; i <= daysPerMonth[month - 1]; i++) days.push(i)

  // * 남은 빈 칸을 다음날 날짜로 채우기 ===================================

  const remained = 7 - (days.length % 7)
  if (remained < 7)
    for (let i = 0; i < remained; i++) days.push('next.' + (i + 1))

  return days
}

const getSelectedWeekNo = (year, month, date) => {
  const allDates = getMonthlyDate(year, month)
  const allWeeks = []
  for (let i = 0; i < 6; i++) {
    allWeeks.push(allDates.splice(0, 7))
  }
  let num = -1
  allWeeks.find((week, i) => {
    num = i
    return week.includes(date)
  })
  return num
}

const getSelectedWeek = (year, month, weekNo) => {
  const allDates = getMonthlyDate(year, month)
  const allWeeks = []
  for (let i = 0; i < 6; i++) {
    allWeeks.push(allDates.splice(0, 7))
  }

  const selectedWeek = allWeeks[weekNo - 1].map((date) => {
    let _year = year
    let _month = month
    let _date = date

    if (typeof _date === 'string') {
      // 이전달인 경우
      if (_date.length >= 3) {
        // _date = parseInt(_date);

        if (_month === 1) {
          _month = 12
          _year -= 1
        } else _month -= 1
      }

      // 다음달인 경우
      else {
        // _date = parseInt(_date);

        if (_month === 12) {
          _month = 1
          _year += 1
        } else _month += 1
      }
    }

    return { year: _year, month: _month, date: _date }
  })

  return selectedWeek
}

const getDateStamp = (year, month, date) => {
  if (month < 10) month = '0' + month
  if (date < 10) date = '0' + date
  return `${year}-${month}-${date}`
}

const getDay = (year, month, date) => {
  return WEEK_DAYS[new Date(getDateStamp(year, month, date)).getDay()]
}

export {
  dateObj,
  getMonthlyDate,
  WEEK_DAYS_KO,
  WEEK_DAYS_EN,
  MONTH_NAMES,
  getDateStamp,
  getDay,
  getSelectedWeek,
  getSelectedWeekNo,
}
