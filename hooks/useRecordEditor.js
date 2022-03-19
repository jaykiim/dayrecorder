import { deleteRecordReq, updateRecordReq } from '../apiCalls/recordCalls'
import { convertToMin } from '../components/scheduler/utils'

const useRecordEditor = (recordId, records, setRecords, setModal, email) => {
  const handleRecordDelete = async () => {
    await deleteRecordReq(recordId)

    const updatedRecords = records.filter((record) => record.id !== recordId)

    setRecords(updatedRecords)
    setModal(false)
  }

  const handleUpdateRecord = async ({
    values,
    recordData,
    errors,
    setErrors,
    selectedColor,
  }) => {
    const { start, end, title, memo } = values
    console.log(values)

    // 삭제된 컬러인데 재선택 안하고 그냥 submit 누른 경우
    if (!selectedColor) {
      setErrors({ ...errors, color: '컬러를 선택해주세요' })
      return
    }

    // 시작 시간보다 끝난 시간이 빠른 경우
    if (convertToMin(start) - convertToMin(end) > 0) {
      setErrors({ ...errors, start: '시작 시간이 종료 시간보다 빠릅니다' })
      return
    }

    const request = {
      ...recordData,
      start,
      end,
      title,
      memo,
      email,
      colorId: selectedColor.id,
      categoryId: selectedColor.userCategory.id,
      recordId,
    }

    const updatedRecord = await updateRecordReq(request)

    const updatedRecords = records.map((record) => {
      if (record.id === recordId) return updatedRecord
      return record
    })

    setRecords(updatedRecords)
    setModal(false)
  }

  return { handleRecordDelete, handleUpdateRecord }
}

export default useRecordEditor
