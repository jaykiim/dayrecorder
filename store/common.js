import { atom, selector } from 'recoil'
import { getCurrentTime, getMinutehandPos } from '../components/scheduler/utils'

// 클릭된 날짜
export const selectedDate = atom({
  key: 'selectedDate',
  default: new Date(),
})

// 현재 시각
export const currentTime = atom({
  key: 'currentTime',
  default: getCurrentTime(),
})

// 현재 시각이 변경됨에 따라 분침 위치를 리턴
export const minutehandPosition = selector({
  key: 'minuteHandPosition',
  get: ({ get }) => {
    const [hour, min] = get(currentTime).split(':')
    return getMinutehandPos(hour, min)
  },
})

// 시간 기록 중인지 아닌지
export const isRecording = atom({
  key: 'isRecording',
  default: null,
})

// 레코드
export const allRecords = atom({
  key: 'allRecords',
  default: [],
})

// 할 일
export const todos = atom({
  key: 'todos',
  default: [],
})
