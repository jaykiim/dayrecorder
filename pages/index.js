import Head from 'next/head'
import Calendar from '../components/calendar/Calendar'
import Scheduler from '../components/scheduler/Scheduler'
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

      <section className="md:w-2/3 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
        <div className="flex flex-col items-center p-4">
          <Calendar date={date} setDate={setDate} />
        </div>
      </section>

      <section className="flex flex-col md:w-full md:overflow-y-scroll md:rounded-2xl md:bg-white">
        <Scheduler />
      </section>
    </>
  )
}

Home.auth = true
export default Home
