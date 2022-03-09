import { atom, selector, selectorFamily } from 'recoil'
import {
  getCurrentTime,
  getMinutehandPos,
} from '../components/scheduler2/utils'

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

// 카테고리
export const categoriesData = atom({
  key: 'categories',
  default: [],
})

// 선택된 카테고리 아이디
export const currentCategoryId = atom({
  key: 'currentCategoryId',
  default: '',
})

// 선택된 카테고리 객체
export const currentCategory = selector({
  key: 'currentCategory',
  get: ({ get }) => {
    const categories = get(categoriesData)
    const id = get(currentCategoryId)

    if (categories) return categories.find((category) => category.id === id)
    else return {}
  },
})

// 선택된 카테고리에 속한 컬러들의 hex 및 tag 배열
export const currentCategoryHexTag = selector({
  key: 'currentCategoryHexTag',
  get: ({ get }) => {
    const selectedCategory = get(currentCategory)

    if (selectedCategory) {
      const hexes = selectedCategory.userColors.map((color) => color.color.hex)
      const tags = selectedCategory.userColors.map((color) => color.tag)
      return [hexes, tags]
    }
  },
})
