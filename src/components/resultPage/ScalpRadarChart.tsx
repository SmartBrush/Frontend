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
    //유분
    case 'sebum':
      if (value <= 29 || value >= 81) return '심각'
      else if (value <= 49 || (value >= 70 && value < 81)) return '보통'
      else return '양호'
    case 'density':
    case 'thickness':
      if (value >= 60) return '양호'
      else if (value >= 40) return '보통'
      else return '심각'
    default:
      if (value >= 70) return '심각'
      else if (value >= 40) return '보통'
      else return '양호'
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
    getLabelFromScore(data.sebumLevelValue, 'sebum'),
    getLabelFromScore(data.poreSizeValue, 'thickness'),
    getLabelFromScore(data.scalingValue, 'scaling'),
  ]

  useEffect(() => {
    const plugin = {
      id: 'customRadarEnhancement',
      beforeDraw(chart: Chart<'radar'>) {
        const ctx = chart.ctx
        const scale = chart.scales.r
        const centerX = scale.xCenter
        const centerY = scale.yCenter
        const levels = scale.ticks.length
        const step = scale.drawingArea / levels
        const pointCount = scale._pointLabels.length

        ctx.save()
        // 내부 격자 & 축선
        for (let i = 1; i <= levels; i++) {
          const r = step * i
          ctx.beginPath()
          for (let j = 0; j < pointCount; j++) {
            const ang = scale.getIndexAngle(j) - Math.PI / 2
            const x = centerX + Math.cos(ang) * r
            const y = centerY + Math.sin(ang) * r
            j ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
          }
          ctx.closePath()
          if (i === levels) {
            ctx.setLineDash([])
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 2
          } else {
            ctx.setLineDash([4, 4])
            ctx.strokeStyle = 'rgba(181,178,178,1)'
            ctx.lineWidth = 1
          }
          ctx.stroke()
        }
        ctx.setLineDash([])
        ctx.strokeStyle = 'rgba(181,178,178,0.7)'
        ctx.lineWidth = 1
        for (let j = 0; j < pointCount; j++) {
          const ang = scale.getIndexAngle(j) - Math.PI / 2
          const x = centerX + Math.cos(ang) * scale.drawingArea
          const y = centerY + Math.sin(ang) * scale.drawingArea
          ctx.beginPath()
          ctx.moveTo(centerX, centerY)
          ctx.lineTo(x, y)
          ctx.stroke()
        }
        ctx.restore()
      },
      afterDraw(chart: Chart<'radar'>) {
        const scale = chart.scales.r
        const ctx = chart.ctx as CanvasRenderingContext2D
        const cX = scale.xCenter
        const cY = scale.yCenter

        ctx.save()
        ctx.font = 'bold 16px sans-serif'
        ctx.fillStyle = '#000'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'bottom' // 아래 기준선
        const ang0 = scale.getIndexAngle(0) - Math.PI / 2
        // 기본반경 = drawingArea + padding(=10)
        const baseR = scale.drawingArea + 10
        // y를  additionalShift 만큼 위로 땡겨줌
        const additionalShift = 30
        const x0 = cX + Math.cos(ang0) * baseR
        const y0 = cY + Math.sin(ang0) * baseR - additionalShift
        ctx.fillText('두피 민감도', x0, y0)
        ctx.restore()
        // 상태 배지 위치를 축 방향으로 대칭 맞춰 조정
        const badgeRadius = scale.drawingArea + 8
        ctx.font = 'bold 12px sans-serif'
        ctx.textBaseline = 'middle'

        statusLabels.forEach((status, i) => {
          const ang = scale.getIndexAngle(i) - Math.PI / 2
          const x = cX + Math.cos(ang) * badgeRadius
          const y = cY + Math.sin(ang) * badgeRadius

          let xOff = 0
          let yOff = 0
          let align: CanvasTextAlign = 'center'
          switch (i) {
            case 0: // 상단
              yOff = -15
              align = 'center'
              break
            case 1: // 우상단
              xOff = 30
              yOff = 15
              align = 'center'
              break
            case 2: // 우하단
              xOff = 30
              yOff = 35
              align = 'center'
              break
            case 3: // 좌하단
              xOff = -35
              yOff = 35
              align = 'center'
              break
            case 4: // 좌상단
              xOff = -30
              yOff = 15
              align = 'center'
              break
          }

          // 배경 및 텍스트
          const pad = 4
          const lh = 14
          const textW = ctx.measureText(status).width
          const bgW = textW + pad * 2
          const bgH = lh + pad * 2
          const bgX =
            x +
            xOff -
            (align === 'center' ? bgW / 2 : align === 'left' ? 0 : bgW)
          const bgY = y + yOff - bgH / 2

          ctx.fillStyle =
            status === '양호'
              ? '#4CAF50'
              : status === '보통'
                ? '#FFC107'
                : '#F44336'
          ctx.beginPath()
          ctx.roundRect?.(bgX, bgY, bgW, bgH, 4)
          ctx.fill()

          ctx.fillStyle = '#fff'
          ctx.textAlign = align
          ctx.fillText(status, x + xOff, y + yOff)
        })

        // 범례
        const lx = cX - 110
        const ly = chart.height - 40
        const w = 220,
          h = 36
        ctx.save()
        ctx.shadowColor = 'rgba(0,0,0,0.1)'
        ctx.shadowBlur = 8
        ctx.shadowOffsetY = 4
        ctx.beginPath()
        ctx.fillStyle = '#fff'
        ctx.strokeStyle = '#B0B0B0'
        ctx.lineWidth = 1
        ctx.roundRect?.(lx, ly, w, h, 18)
        ctx.fill()
        ctx.stroke()
        ctx.restore()
        ctx.font = '13px sans-serif'
        ctx.textAlign = 'left'
        ctx.fillStyle = 'rgba(225,246,215,0.64)'
        ctx.beginPath()
        ctx.roundRect?.(lx + 18, ly + 15, 25, 10, 6)
        ctx.fill()
        ctx.fillStyle = '#000'
        ctx.fillText('나의 상태', lx + 50, ly + 20)
        ctx.fillStyle = '#B5B2B2'
        ctx.beginPath()
        ctx.roundRect?.(lx + 135, ly + 15, 25, 10, 6)
        ctx.fill()
        ctx.fillStyle = '#000'
        ctx.fillText('평균', lx + 170, ly + 20)
      },
    }

    ChartJS.register(plugin)
    return () => ChartJS.unregister(plugin)
  }, [statusLabels])

  const radarData = {
    labels: ['두피 민감도', '모발 밀도', '유분 정도', '모발 굵기', '각질/비듬'],
    datasets: [
      {
        label: '나의 상태',
        data: [
          data.scalpSensitivityValue,
          data.densityValue,
          data.sebumLevelValue,
          data.poreSizeValue,
          data.scalingValue,
        ],
        backgroundColor: 'rgba(225, 246, 215, 0.64)',
        borderWidth: 0,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
      {
        label: '평균',
        data: [60, 63, 60, 55, 68],
        borderColor: '#B5B2B2',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  }

  const options: ChartOptions<'radar'> = {
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { display: false },
        grid: { display: false },
        pointLabels: {
          display: true,
          font: { size: 16, weight: 'bold' },
          color: '#000',
          padding: 10,
          callback: (label, idx) => (idx === 0 ? '' : label),
        },
        suggestedMin: 0,
        suggestedMax: 100,

        ticks: {
          display: false,
          stepSize: 25,
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-4">
      <div className="h-[380px]">
        <Radar data={radarData} options={options} />
      </div>
    </div>
  )
}

export default ScalpRadarChart
