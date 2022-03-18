import * as Yup from 'yup'

export const getCategoryNameValidate = (categories) => {
  const names = categories.map((category) => category.categoryName)

  return Yup.object({
    categoryName: Yup.string()
      .required('카테고리명을 입력하세요')
      .notOneOf(names, '이미 존재하는 카테고리명입니다'),
  })
}
