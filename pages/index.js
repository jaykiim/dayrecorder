import Head from 'next/head'
import Calendar from '../components/calendar/Calendar'
// import Scheduler from '../components/scheduler/Scheduler'
import SideTap from '../components/container/SideTap'
import MainTap from '../components/container/MainTap'
import { useRecoilState } from 'recoil'
import { selectedDate } from '../store/common'

const Home = () => {
  const [date, setDate] = useRecoilState(selectedDate)

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SideTap>
        <Calendar date={date} setDate={setDate} />
      </SideTap>

      <MainTap>{/* <Scheduler /> */}</MainTap>
    </>
  )
}

Home.auth = true
export default Home
