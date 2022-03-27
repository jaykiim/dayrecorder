import { DEFAULT_COLOR } from '../../store/constants'
import { convertToMin } from '../scheduler/utils'

export const getRecordsByCat = (records) => {
  const sortByCat = records.reduce((acc, record) => {
    // 만약 레코드가 사용중이던 컬러나 카테고리가 삭제됐을 경우 userCategory = null임
    const curCatName = record.userCategory?.categoryName || '미분류'
    const curCatRecords = acc[curCatName] || []

    return {
      ...acc,
      [curCatName]: [...curCatRecords, record],
    }
  }, {})

  const data = Object.keys(sortByCat).map((categoryName) => {
    const curCatRecords = sortByCat[categoryName].reduce((acc, record) => {
      const time = convertToMin(record.end) - convertToMin(record.start)
      const tag = record.userColor?.tag || DEFAULT_COLOR.tag

      return {
        ...acc,
        [tag]: (acc[tag] || 0) + time,
      }
    }, {})

    return {
      category: categoryName,
      ...curCatRecords,
    }
  })

  return data
}

export const getTags = (records) => {
  return [
    ...new Set(
      records.map((record) => record.userColor?.tag || DEFAULT_COLOR.tag)
    ),
  ] // 중복 제거
}

export const getColors = (records) => {
  return records.reduce(
    (acc, record) => ({
      ...acc,
      [record.userColor?.tag || DEFAULT_COLOR.tag]:
        record.userColor?.color?.hex || DEFAULT_COLOR.hex,
    }),
    {}
  )
}
