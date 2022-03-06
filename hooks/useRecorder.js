import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { createRecordReq } from '../apiCalls/recordCalls'
import { dateObj } from '../components/calendar/utils'
import { dateFormatter, getCurrentTime } from '../components/scheduler/utils'
import { allRecords, isRecording } from '../store/common'

export function useRecorder() {
  const setRecording = useSetRecoilState(isRecording)
  const user = useSession().data.user

  useEffect(() => {
    window.localStorage.getItem('recording')
      ? setRecording(true)
      : setRecording(false)
  }, [])

  const setRecords = useSetRecoilState(allRecords)

  const startRecording = (e, title, color, setModal) => {
    e.preventDefault()

    setRecording(true)

    const { year, month, day } = dateObj(new Date())
    const datestamp = dateFormatter(year, month, day)

    window.localStorage.setItem(
      'recording',
      JSON.stringify({
        start: getCurrentTime(),
        title,
        color,
        date: datestamp,
      })
    )

    setModal(false)
  }

  const stopRecording = async () => {
    setRecording(false)

    // 시작할 때 저장해두었던 정보 가져오기
    const saved = JSON.parse(window.localStorage.getItem('recording'))
    if (!saved) return
    const { start, title, color, date: startDate } = saved

    // 끝난 시간
    const end = getCurrentTime()

    // 끝난 날짜
    const { year, month, day } = dateObj(new Date())
    const endDate = dateFormatter(year, month, day)

    // * 시작 날짜와 끝난 날짜가 다를 경우
    // 시작 날짜의 시작 시간 ~ 23:59 까지 레코드, 끝난 날짜의 00:00 ~ 끝난 시간까지 레코드를 만든다
    if (startDate !== endDate) {
      const record1 = {
        date: startDate,
        start,
        end: '23:59',
        title,
        color,
        memo: '',
      }
      const record2 = { date: endDate, start, end, title, color, memo: '' }

      // DB에 저장하고나서 응답으로 오는 데이터에 id가 포함되어 있으므로, 응답을 받고 난 다음에 setRecords를 해줘야한다
      const recordOne = await createRecordReq({ ...record1, user: user.email })
      const recordTwo = await createRecordReq({ ...record2, user: user.email })

      setRecords((records) => [...records, recordOne, recordTwo])
    }

    // 시작 날짜와 끝난 날짜가 같으면
    else {
      const newRecord = {
        date: startDate,
        start,
        end,
        title,
        color,
        memo: '',
      }

      const record = await createRecordReq({ ...newRecord, email: user.email })
      setRecords((records) => [...records, record])
    }

    // 로컬 스토리지 지우기
    window.localStorage.removeItem('recording')
  }

  return { startRecording, stopRecording }
}
