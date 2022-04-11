import nodemailer from 'nodemailer'

export default async (req, res) => {
  const code = Math.random().toString().substring(2, 8)
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.NEXT_PUBLIC_NODEMAILER_USER,
      pass: process.env.NEXT_PUBLIC_NODEMAILER_PASS,
    },
  })
  console.log(code, req.body.mail)

  const mailOption = await smtpTransport.sendMail({
    from: 'Day Recorder',
    to: req.body.mail,
    subject: '[DayRecorder] 인증 코드입니다',
    text: '오른쪽 숫자 6자리를 입력해주세요 : ' + code,
  })

  smtpTransport.sendMail(mailOption, function (error, info) {
    if (error) console.log(error)
    else {
      res.send(code)
      smtpTransport.close()
    }
  })
}
