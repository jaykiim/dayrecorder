import * as Yup from 'yup'
import YupPassword from 'yup-password'

YupPassword(Yup)

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

const password = Yup.object({
  password: Yup.string()
    .min(8, '최소 8자 이상이어야 합니다')
    .minUppercase(1, '하나 이상의 대문자를 포함해야 합니다')
    .minNumbers(1, '하나 이상의 숫자를 포함해야 합니다')
    .minSymbols(1, '하나 이상의 특수문자를 포함해야 합니다')
    .required('필수 입력 항목입니다'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다')
    .required('필수 입력 항목입니다'),
})

const phoneNumber = Yup.object({
  phoneNumber: Yup.string().matches(
    /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/,
    '잘못된 휴대폰 번호입니다'
  ),
})

const verificationCode = (actualCode) => {
  Yup.object({
    verificationCode: Yup.string().matches(
      actualCode,
      '인증번호가 일치하지 않습니다'
    ),
  })
}

export default {
  record,
  categoryName,
  color,
  password,
  phoneNumber,
  verificationCode,
}
