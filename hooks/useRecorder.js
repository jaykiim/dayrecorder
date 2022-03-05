import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { createRecordReq } from '../apiCalls/recordCalls'
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

    const date = new Date()
    const datestamp = dateFormatter(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    )

    console.log(datestamp)

    window.localStorage.setItem(
      'recording',
      JSON.stringify({ start: getCurrentTime(), title, color, date: datestamp })
    )

    setModal(false)
  }

  const stopRecording = () => {
    setRecording(false)

    // 시작할 때 저장해두었던 정보 가져오기
    const saved = JSON.parse(window.localStorage.getItem('recording'))
    if (!saved) return
    const { start, title, color, date: startDate } = saved

    // 끝난 시간
    const end = getCurrentTime()

    // 끝난 날짜
    const date = new Date()
    const endDate = dateFormatter(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    )

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
      setRecords((records) => [...records, record1, record2])

      createRecordReq({ ...record1, user: user.email })
      createRecordReq({ ...record2, user: user.email })
    }

    // 시작 날짜와 끝난 날짜가 같으면
    else {
      console.log(start)
      const newRecord = { date: startDate, start, end, title, color, memo: '' }
      setRecords((records) => [...records, newRecord])

      createRecordReq({ ...newRecord, email: user.email })
    }

    // 로컬 스토리지 지우기
    window.localStorage.removeItem('recording')
  }

  return { startRecording, stopRecording }
}
