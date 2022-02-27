import * as Yup from 'yup'

export const colorValidate = (where, tags, hexes) => {
  return Yup.object({
    hex: Yup.string()
      .required('* 색상 코드를 입력해주세요')
      .notOneOf(
        where === 'update' ? [] : hexes,
        '* 이미 폴더에 존재하는 색상입니다'
      )
      .matches(
        /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
        '* 존재하지 않는 색상 코드입니다'
      ),
    colorTag: Yup.string()
      .required('* 색상 이름 (tag) 을 입력해주세요')
      .notOneOf(tags, '* 이미 폴더에 존재하는 색상명입니다'),
  })
}
