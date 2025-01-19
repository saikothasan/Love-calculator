import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface CompatibilityTimelineProps {
  name1: string
  name2: string
}

export function CompatibilityTimeline({ name1, name2 }: CompatibilityTimelineProps) {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const labels = ['1 Month', '6 Months', '1 Year', '5 Years', '10 Years']
    const datasets = [
      {
        label: 'Compatibility',
        data: labels.map(() => Math.random() * 100),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
    setData({ labels, datasets })
  }, [name1, name2])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Compatibility Over Time',
      },
    },
  }

  return data ? (
    <div className="mt-8">
      <Line options={options} data={data} />
    </div>
  ) : null
}

