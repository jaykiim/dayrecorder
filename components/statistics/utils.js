import { convertToMin } from '../scheduler/utils'

export const perCategoryWhole = (categories) => {
  const data = categories.map((item) => {
    const category = item.categoryName

    // 막대 하나 (= 카테고리) 의 한 칸 (= 사용자 컬러) 객체 ---> { category, color1: 총 투자 시간, color2: 총 투자 시간, ...}
    const legends = item.userColors.reduce((acc, currentColor) => {
      const currentColorOverallTime = currentColor.record.reduce(
        (acc, curColorRecord) =>
          acc +
          (convertToMin(curColorRecord.end) -
            convertToMin(curColorRecord.start)),
        0
      )

      return { ...acc, [currentColor.tag]: currentColorOverallTime }
    }, {})

    return { category, ...legends }
  })

  return data
}

export const getColors = (categories) => {
  console.log('categories', categories)

  const colors = categories.reduce((acc, category) => {
    const curCategoryColors = category.userColors.reduce(
      (acc, curCategoryColor) => ({
        ...acc,
        [curCategoryColor.tag]: curCategoryColor.color.hex,
      }),
      {}
    )
    return { ...acc, ...curCategoryColors }
  }, {})

  console.log('colors', colors)

  return colors
}
