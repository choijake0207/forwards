import React, { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from "chart.js"
import {format} from "date-fns"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)



export default function Graph({firstDate, habits}) {

  const start = new Date(firstDate).setHours(0,0,0,0)
  const today = new Date().setHours(0,0,0,0)
  const timeframe = today - start

  // label generator
  const labelGenerator = useMemo(() => {
    let labels = []
    // labels for less than 1 month activity (daily)
    if (timeframe <= (30 * 86400000)) {
      let current = new Date(start)
      while (current <= today) {
        labels.push(format(new Date(current), "MM-dd"))
        current.setDate(current.getDate() + 1)
      } // labels for less 1-2 months (weekly)
    } else if (timeframe <= (60 *86400000)) {
        let current = new Date(start)
        while (current <= today) {
          labels.push(format(new Date(current), "MM-dd"))
          current.seDate(current.getDate() + 7)
      }
    } else {
      while (current <= today) {
        labels.push(format(new Date(current), "MM-yyyy"))
        current.setMonth(current.getMonth() + 1)
      }
    }
    return labels
  
  }, [habits, start, today])

  // data set generator
  const dataSetGenerator = useMemo(() => {
    let current = new Date(start)
    let rate = []
    while (current <= today) {
      let formattedDate = new Date(new Date(current).setHours(0,0,0,0))
      let totalCheckInDays = 0
      let totalCheckIns = 0

      habits.forEach(habit => {
        const dayObject = habit.days.find(day => format(new Date(day.date).setHours(0,0,0,0), "yyyy-MM-dd") == format(new Date(formattedDate).setHours(0,0,0,0), "yyyy-MM-dd"))
        if (dayObject) {
          if (dayObject.isCheckInDay) totalCheckInDays++
          if (dayObject.isChecked) totalCheckIns++
        }
      })

      let dailyRate = totalCheckInDays > 0 ? (totalCheckIns / totalCheckInDays) * 100 : 0
      rate.push(dailyRate)
      current.setDate(current.getDate() + 1)
    }
    return rate
  }, [start, today, habits])

  const graphData = {
    labels: labelGenerator,
    datasets: [{label: "Check In Rate", data: dataSetGenerator}],
  }

  return (
   <Line data={graphData}/>
  )
}
