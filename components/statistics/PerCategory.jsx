import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { ResponsiveBar } from '@nivo/bar'
import { getColors, perCategoryWhole } from './utils'
import { useRecoilValue } from 'recoil'
import { selectedDate } from '../../store/common'
import { dateObj, getSelectedWeekNo } from '../calendar/utils'
import {
  getDailyRecordsCategoryReq,
  getFromToRecordsCategoryReq,
} from '../../apiCalls/colorCalls'
import { dateFormatter } from '../scheduler/utils'

const PerCategory = () => {
  const email = useSession().data.user.email

  const date = useRecoilValue(selectedDate)
  const { year, month, day } = dateObj(date)

  const week = getSelectedWeekNo(year, month, day)
  const [weekFirst, weekLast] = [
    dateFormatter(year, month, week[0]),
    dateFormatter(year, month, week[6]),
  ]

  let daily,
    weekly,
    monthly = null

  useEffect(() => {
    const fetchRecordsCategory = async () => {
      try {
        const dailyRecordsCat = await getDailyRecordsCategoryReq(email, date)
        const weeklyRecordsCat = await getFromToRecordsCategoryReq(
          email,
          weekFirst,
          weekLast
        )
        // const monthlyRecordsCat = await getFromToRecordsCategoryReq()
        console.log(dailyRecordsCat)
        daily = dailyRecordsCat
      } catch (err) {
        console.log(err)
      }
    }

    fetchRecordsCategory()
  }, [])

  return (
    <div style={{ height: '400px' }}>
      {/* <ResponsiveBar
        data={data}
        colors={(bar) => colors[bar.id]}
        keys={tags}
        indexBy="category"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '카테고리',
          legendPosition: 'middle',
          legendOffset: 40,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '시간 (분)',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 14,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      /> */}
    </div>
  )
}

export default PerCategory
