import { atom, selector } from 'recoil'

// 클릭된 날짜
export const selectedDate = atom({
  key: 'selectedDate',
  default: new Date(),
})
