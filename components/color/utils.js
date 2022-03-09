import * as Yup from 'yup'

export const colorValidate = (where, tags, hexes) => {
  return Yup.object({
    hex: Yup.string()
      .required('* 컬러 코드를 입력해주세요')
      .notOneOf(
        where === 'update' ? [] : hexes,
        '* 이미 폴더에 존재하는 컬러입니다'
      )
      .matches(
        /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
        '* 존재하지 않는 컬러 코드입니다'
      ),
    tag: Yup.string()
      .required('* 색상 이름 (tag) 을 입력해주세요')
      .notOneOf(tags, '* 이미 폴더에 존재하는 이름입니다'),
  })
}

export const categoryNameValidate = (validationProps) =>
  Yup.object({
    value: Yup.string()
      .required('카테고리명을 입력하세요')
      .notOneOf(validationProps.notOneOf, '이미 존재하는 카테고리명입니다'),
  })
