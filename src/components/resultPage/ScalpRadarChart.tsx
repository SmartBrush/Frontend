import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  type ChartOptions,
  type Chart,
} from 'chart.js'
import { useEffect } from 'react'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
)

const getLabelFromScore = (value: number, type: string): string => {
  switch (type) {
    case 'sebum':
      if (value <= 29 || value >= 91) return '심각'
      else if (value <= 49 || value >= 70) return '보통'
      else return '양호'
    case 'density':
    case 'thickness':
      if (value >= 60) return '양호'
      else if (value >= 40) return '보통'
      else return '심각'
    default:
      if (value >= 70) return '양호'
      else if (value >= 40) return '보통'
      else return '심각'
  }
}

type RadarDataProps = {
  data: {
    scalpSensitivityValue: number
    densityValue: number
    scalingValue: number
    poreSizeValue: number
    sebumLevelValue: number
  }
}

const ScalpRadarChart = ({ data }: RadarDataProps) => {
  const statusLabels = [
    getLabelFromScore(data.scalpSensitivityValue, 'sensitivity'),
    getLabelFromScore(data.densityValue, 'density'),
    getLabelFromScore(data.scalingValue, 'scaling'),
    getLabelFromScore(data.poreSizeValue, 'thickness'),
    getLabelFromScore(data.sebumLevelValue, 'sebum'),
  ]

  useEffect(() => {
    const plugin = {
      id: 'pointLabelBackground',
      afterDraw(chart: Chart<'radar'>) {
        const scale = chart.scales.r
        const ctx = chart.ctx as CanvasRenderingContext2D
        const centerX = scale.xCenter
        const centerY = scale.yCenter
        const radius = scale.drawingArea + 30
        const fontSize = 12
        const lineHeight = 14

        ctx.font = `${fontSize}px sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        statusLabels.forEach((status: string, index: number) => {
          const angle = scale.getIndexAngle(index) - Math.PI / 2
          const x = centerX + Math.cos(angle) * radius
          const y = centerY + Math.sin(angle) * radius

          let yOffset = 0
          if (angle >= -Math.PI / 4 && angle <= Math.PI / 4) {
            yOffset = 10 // 오른쪽
          } else if (angle >= Math.PI / 4 && angle <= (3 * Math.PI) / 4) {
            yOffset = 16 // 아래쪽
          } else if (angle <= -Math.PI / 4 && angle >= -(3 * Math.PI) / 4) {
            yOffset = -16 // 위쪽
          }

          let extraYOffset = 0
          if (index === 1 || index === 4) {
            extraYOffset = 10 // 더 아래로 내림
          }

          const finalX = x
          const finalY = y + yOffset + extraYOffset

          let bgColor = 'transparent'
          if (status === '양호') bgColor = '#4CAF50'
          else if (status === '보통') bgColor = '#FFC107'
          else if (status === '심각') bgColor = '#F44336'

          const padding = 4
          const width = ctx.measureText(status).width
          const height = lineHeight

          ctx.fillStyle = bgColor
          ctx.fillRect(
            finalX - width / 2 - padding,
            finalY - height / 2 - padding,
            width + padding * 2,
            height + padding * 2,
          )

          ctx.fillStyle = 'white'
          ctx.fillText(status, finalX, finalY)
        })
      },
    }
    ChartJS.register(plugin)
    return () => ChartJS.unregister(plugin)
  }, [statusLabels])

  const radarData = {
    labels: ['두피 민감도', '모발 밀도', '각질/비듬', '모발 굵기', '유분 정도'],
    datasets: [
      {
        label: '나의 상태',
        data: [
          data.scalpSensitivityValue,
          data.densityValue,
          data.scalingValue,
          data.poreSizeValue,
          data.sebumLevelValue,
        ],
        backgroundColor: 'rgba(225, 246, 215, 0.64)',
        borderWidth: 0,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
      {
        label: '평균',
        data: [50, 50, 50, 50, 50],
        backgroundColor: 'rgba(148,163,184,0.2)',
        borderColor: 'rgba(148,163,184,1)',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  }

  const options: ChartOptions<'radar'> = {
    scales: {
      r: {
        angleLines: {
          color: 'rgba(181,178,178,1)',
          lineWidth: 1,
        },
        grid: {
          color: 'rgba(181,178,178,1)',
          lineWidth: 1,
          borderDash: [4, 4],
        },
        pointLabels: {
          display: true,
          font: {
            size: 13,
          },
          color: '#000',
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-4">
      <Radar data={radarData} options={options} />
    </div>
  )
}

export default ScalpRadarChart
