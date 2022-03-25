import { atom, atomFamily, selector, selectorFamily } from 'recoil'
import { getRecordsBetweenReq, getRecordsReq } from '../apiCalls/recordCalls'
import { getUserCategoryReq } from '../apiCalls/colorCalls'
import { getTodosReq } from '../apiCalls/todoCalls'
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

// 타이머 시작 상태
export const isTimerOn = atom({
  key: 'isTimerOn',
  default: null,
})

// 레코드 (일간)
export const recordsData = atomFamily({
  key: 'recordsData',
  default: async ({ datestamp, email }) => {
    const records = await getRecordsReq(datestamp, email)
    return records
  },
})

// 레코드 (주간, 월간)
export const recordsBetween = atomFamily({
  key: 'recordsBetween',
  default: async ({ email, firstday, lastday }) => {
    const records = await getRecordsBetweenReq(email, firstday, lastday)
    return records
  },
})

// 할 일
export const todosData = atomFamily({
  key: 'todosData',
  default: async (values) => {
    const { todos } = await getTodosReq(values)
    return todos
  },
})

// 카테고리
export const categoriesData = atomFamily({
  key: 'categoriesData',
  default: async (email) => {
    const categories = await getUserCategoryReq(email)
    return categories
  },
})

// 선택된 카테고리 아이디
export const currentCategoryId = atom({
  key: 'currentCategoryId',
  default: '',
})

// 선택된 카테고리 객체
export const currentCategory = selectorFamily({
  key: 'currentCategory',
  get:
    (email) =>
    ({ get }) => {
      const categories = get(categoriesData(email))
      const id = get(currentCategoryId)

      if (!categories) return {}
      else if (!id) return categories[0]
      else return categories.find((category) => category.id === id)
    },
})

// 선택된 카테고리에 속한 컬러들의 hex 및 tag 배열
export const currentCategoryHexTag = selectorFamily({
  key: 'currentCategoryHexTag',
  get:
    (email) =>
    ({ get }) => {
      const selectedCategory = get(currentCategory(email))

      if (selectedCategory) {
        const hexes = selectedCategory.userColors.map(
          (color) => color.color.hex
        )
        const tags = selectedCategory.userColors.map((color) => color.tag)
        return [hexes, tags]
      }
    },
})
