import * as Yup from 'yup'

const record = Yup.object({
  start: Yup.string()
    .matches(
      /^(0[0-9]|1[0-9]|2[0-4]):(0[0-9]|[1-5][0-9])$/g,
      '시간을 xx:xx 형식으로 입력해주세요'
    )
    .required('시작 시각을 입력해주세요'),
  end: Yup.string()
    .required('종료 시각을 입력해주세요')
    .matches(
      /^(0[0-9]|1[0-9]|2[0-4]):(0[0-9]|[1-5][0-9])$/g,
      '시간을 xx:xx 형식으로 입력해주세요'
    ),
})

const categoryName = (categories) => {
  const names = categories.map((category) => category.categoryName)

  return Yup.object({
    categoryName: Yup.string()
      .required('카테고리명을 입력하세요')
      .notOneOf(names, '이미 존재하는 카테고리명입니다'),
  })
}

const color = (hex, tag) =>
  Yup.object({
    [hex]: Yup.string()
      .required('* 컬러 코드 (hex) 를 입력해주세요')
      .matches(
        /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
        '* 존재하지 않는 컬러 코드입니다'
      ),
    [tag]: Yup.string().required('* 컬러명 (tag) 를 입력해주세요'),
  })

export default { record, categoryName, color }
