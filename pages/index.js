import Head from 'next/head'
import Calendar from '../components/calendar/Calendar'
import Timer from '../components/timer/Timer'
import Scheduler from '../components/scheduler/Scheduler'
import SideTap from '../components/container/SideTap'
import MainTap from '../components/container/MainTap'

const Home = () => {
  return (
    <>
      <Head>
        <title>Day Recorder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SideTap>
        <Calendar />
        <Timer />
      </SideTap>

      <MainTap>
        <Scheduler />
      </MainTap>
    </>
  )
}

Home.auth = true
export default Home
