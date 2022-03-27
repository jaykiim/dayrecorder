import { useSetRecoilState } from 'recoil'
import { currentTime } from '../store/common'
import { timeUtil } from '../utils'

function useMinuteHand() {
  const setNow = useSetRecoilState(currentTime)

  function timeSetter(cb) {
    const min = 60 * 1000
    const now = new Date()
    const remaining = min - now.getSeconds() * 1000 - now.getMilliseconds()
    let timer

    if (remaining > 100) timer = setTimeout(() => cb(), remaining)

    return timer
  }

  return timeSetter(() => setNow(timeUtil.getCurrentTime()))
}

export default useMinuteHand
