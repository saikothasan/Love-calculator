import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface CompatibilityChartProps {
  result: number
}

export function CompatibilityChart({ result }: CompatibilityChartProps) {
  const data = {
    labels: ['Compatible', 'Incompatible'],
    datasets: [
      {
        data: [result, 100 - result],
        backgroundColor: ['#EC4899', '#E5E7EB'],
        hoverBackgroundColor: ['#DB2777', '#D1D5DB'],
      },
    ],
  }

  const options = {
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return (
    <div className="relative w-48 h-48 mx-auto">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-pink-600">{result}%</span>
      </div>
    </div>
  )
}

