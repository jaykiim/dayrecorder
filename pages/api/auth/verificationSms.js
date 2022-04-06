import twilio from 'twilio'

export default async (req, res) => {
  try {
    const code = Math.random().toString().substring(2, 8)
    const sid = process.env.NEXT_PUBLIC_TWILIO_SID
    const token = process.env.NEXT_PUBLIC_TWILIO_TOKEN

    const client = twilio(sid, token)

    const result = await client.messages.create({
      body: `DayRecorder 인증 번호 [${code}]를 입력해주세요`,
      from: process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER,
      to: req.body.phoneNumber,
    })

    if (result) res.send(code)
    else res.send('문제가 발생하였습니다. 다시 시도해주세요.')
  } catch (err) {
    console.log(err)
  }
}
