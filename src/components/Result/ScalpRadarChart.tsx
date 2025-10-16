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
  type RadialLinearScale as RadialScaleType,
} from 'chart.js'
import { useEffect, useMemo } from 'react'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
)

type RadarDataProps = {
  data: {
    scalpSensitivityValue: number
    scalpSensitivityLevel: string
    densityValue: number
    densityLevel: string
    sebumLevelValue: number
    sebumLevel: string
    poreSizeValue: number
    poreSizeLevel: string
    scalingValue: number
    scalingLevel: string
  }
}

const ScalpRadarChart = ({ data }: RadarDataProps) => {
  const statusLabels = useMemo(
    () => [
      data.scalpSensitivityLevel,
      data.densityLevel,
      data.sebumLevel,
      data.poreSizeLevel,
      data.scalingLevel,
    ],
    [data],
  )

  useEffect(() => {
    const plugin = {
      id: 'customRadarEnhancement',
      beforeDraw(chart: Chart<'radar'>) {
        const ctx = chart.ctx
        const scale = chart.scales.r as RadialLinearScale & {
          xCenter: number
          yCenter: number
          drawingArea: number
          _pointLabels: string[]
          getIndexAngle: (index: number) => number
        }

        const centerX = scale.xCenter
        const centerY = scale.yCenter
        const levels = scale.ticks.length
        const step = scale.drawingArea / levels
        const pointCount = scale._pointLabels.length

        ctx.save()

        // 내부 격자
        for (let i = 1; i <= levels; i++) {
          const r = step * i
          ctx.beginPath()
          for (let j = 0; j < pointCount; j++) {
            const ang = scale.getIndexAngle(j) - Math.PI / 2
            const x = centerX + Math.cos(ang) * r
            const y = centerY + Math.sin(ang) * r
            if (j) {
              ctx.lineTo(x, y)
            } else {
              ctx.moveTo(x, y)
            }
          }
          ctx.closePath()
          ctx.setLineDash(i === levels ? [] : [4, 4])
          ctx.strokeStyle = i === levels ? 'black' : 'rgba(181,178,178,1)'
          ctx.lineWidth = i === levels ? 2 : 1
          ctx.stroke()
        }

        // 축선
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
        const scale = chart.scales.r as RadialScaleType & {
          xCenter: number
          yCenter: number
          drawingArea: number
          _pointLabels: string[]
          getIndexAngle: (index: number) => number
        }
        const ctx = chart.ctx as CanvasRenderingContext2D
        const cX = scale.xCenter
        const cY = scale.yCenter

        // 라벨 "두피 민감도" 직접 추가
        ctx.save()
        ctx.font = 'bold 16px sans-serif'
        ctx.fillStyle = '#000'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'bottom'
        const ang0 = scale.getIndexAngle(0) - Math.PI / 2
        const baseR = scale.drawingArea + 10
        const additionalShift = 30
        const x0 = cX + Math.cos(ang0) * baseR
        const y0 = cY + Math.sin(ang0) * baseR - additionalShift
        ctx.fillText('두피 민감도', x0, y0)
        ctx.restore()

        // 상태 라벨 렌더링
        const badgeRadius = scale.drawingArea + 8
        ctx.font = 'bold 12px sans-serif'
        ctx.textBaseline = 'middle'

        statusLabels.forEach((status, i) => {
          const ang = scale.getIndexAngle(i) - Math.PI / 2
          const x = cX + Math.cos(ang) * badgeRadius
          const y = cY + Math.sin(ang) * badgeRadius

          let xOff = 0,
            yOff = 0
          switch (i) {
            case 0:
              yOff = -15
              break // 상단
            case 1:
              xOff = 30
              yOff = 15
              break // 우상단
            case 2:
              xOff = 30
              yOff = 35
              break // 우하단
            case 3:
              xOff = -35
              yOff = 35
              break // 좌하단
            case 4:
              xOff = -30
              yOff = 15
              break // 좌상단
          }

          const pad = 4,
            lh = 14
          const textW = ctx.measureText(status).width
          const bgW = textW + pad * 2
          const bgH = lh + pad * 2
          const bgX = x + xOff - bgW / 2
          const bgY = y + yOff - bgH / 2

          ctx.fillStyle =
            status === '양호'
              ? '#4CAF50'
              : status === '보통'
                ? '#FFC107'
                : '#F44336'
          ctx.beginPath()
          if (ctx.roundRect) {
            ctx.roundRect(bgX, bgY, bgW, bgH, 4)
          }
          ctx.fill()

          ctx.fillStyle = '#fff'
          ctx.textAlign = 'center'
          ctx.fillText(status, x + xOff, y + yOff)
        })

        // 범례
        const lx = cX - 110,
          ly = chart.height - 40
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
        if (ctx.roundRect) {
          ctx.roundRect(lx, ly, w, h, 18)
        }
        ctx.fill()
        ctx.stroke()
        ctx.restore()

        ctx.font = '13px sans-serif'
        ctx.textAlign = 'left'
        ctx.fillStyle = 'rgba(225,246,215,0.64)'
        ctx.beginPath()
        if (ctx.roundRect) {
          ctx.roundRect(lx + 18, ly + 15, 25, 10, 6)
        }
        ctx.fill()
        ctx.fillStyle = '#000'
        ctx.fillText('나의 상태', lx + 50, ly + 20)
        ctx.fillStyle = '#B5B2B2'
        ctx.beginPath()
        if (ctx.roundRect) {
          ctx.roundRect(lx + 135, ly + 15, 25, 10, 6)
        }
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
        data: [45, 57, 60, 55, 53],
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
          callback: (label: string, idx: number) => {
            return idx === 0 ? '' : label
          },
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: { display: false, stepSize: 25 },
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
