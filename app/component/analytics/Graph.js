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



export default function Graph({firstDate, habits, rate}) {

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
          current.setDate(current.getDate() + 7)
      }
    } else {
      while (current <= today) {
        labels.push(format(new Date(current), "MM-yyyy"))
        current.setMonth(current.getMonth() + 1)
      }
    }
    return labels
  
  }, [habits, start, today])

 

  const graphData = {
    labels: labelGenerator,
    datasets: [
      {
        label: "Check In Rate", 
        data: rate, 
        borderColor: "rgba(52, 114, 231, 0.5)",
        borderWidth: 1,
        backgroundColor: "rgba(52, 114, 231, 0.5)",
        pointHoverBorderColor: "rgb(52, 114, 231)",
      }
    ],
  }
  const graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    layout: {
      padding: {
        top: 30
      }
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        }
      }
    }
  }

  return (
   <Line data={graphData} options={graphOptions}/>
  )
}
