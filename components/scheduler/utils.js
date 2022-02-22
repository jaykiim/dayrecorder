// DO 타임 라인
export const getTimeline = () => {
  const timeline = ['00:00']

  for (let i = 1; i < 24; i++) {
    let time = i < 10 ? '0' + i : i
    timeline.push(`${time}:00`)
    timeline.push(`${time}:30`)
  }

  return timeline
}
