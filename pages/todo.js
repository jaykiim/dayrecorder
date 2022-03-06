import MainTap from '../components/container/MainTap'
import SideTap from '../components/container/SideTap'
import Calendar from '../components/calendar/Calendar'
import { useRecoilState } from 'recoil'
import { selectedDate } from '../store/common'
import Todo from '../components/todo/Todo'

const todo = () => {
  const [date, setDate] = useRecoilState(selectedDate)

  return (
    <>
      <SideTap>
        <Calendar date={date} setDate={setDate} />
      </SideTap>
      <MainTap>
        <Todo />
      </MainTap>
    </>
  )
}

todo.auth = true
export default todo
