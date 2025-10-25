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
// 1. 지표메타 (라벨 + 방향 )
const METRICS = [
  { key: 'scalpSensitivityValue', label: '두피 민감도', higherIsBetter: false }, // 낮을수록 좋음
  { key: 'densityValue', label: '모발 밀도', higherIsBetter: true }, // 높을수록 good
  { key: 'sebumLevelValue', label: '유분 정도', higherIsBetter: false }, // 낮을수록 좋음
  { key: 'poreSizeValue', label: '모발 굵기', higherIsBetter: true }, // 높을수록 good
  { key: 'scalingValue', label: '각질/비듬', higherIsBetter: false }, // 낮을수록 좋음
] as const

type MetricKey = (typeof METRICS)[number]['key']

const clamp100 = (v: number) => Math.max(0, Math.min(100, v ?? 0))
// “좋음=바깥쪽” 표시값으로 변환
const toDisplay = (raw: number, hib: boolean) => {
  const c = clamp100(raw)
  return hib ? c : 100 - c
}

const ScalpRadarChart = ({ data }: RadarDataProps) => {
  // 상태 배지용 라벨 (기존 그대로 함ㅁ)
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

  // 2. 원시값/ 표시값
  const labels = METRICS.map((m) => m.label)
  const mineRaw = METRICS.map(
    (m) => (data as any)[m.key as MetricKey] as number,
  )
  const avgRaw = [45, 57, 60, 55, 53] // 현재 고정 평균 (원시값)

  const mineDisplay = METRICS.map((m, i) =>
    toDisplay(mineRaw[i], m.higherIsBetter),
  )
  const avgDisplay = METRICS.map((m, i) =>
    toDisplay(avgRaw[i], m.higherIsBetter),
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

        // 라벨 "두피 민감도"
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

  //4. 데이터셋 : radar에는 표시값, 원시값은 커스텀 필드에 보관
  const radarData = {
    labels,
    datasets: [
      {
        label: '나의 상태',
        data: mineDisplay,
        backgroundColor: 'rgba(225, 246, 215, 0.64)',
        borderWidth: 0,
        pointRadius: 0,
        pointHoverRadius: 0,
        // 커스텀(툴팁에서 원시값 사용)
        raws: mineRaw,
        displays: mineDisplay,
        meta: METRICS,
      } as any,
      {
        label: '평균',
        data: avgDisplay,
        borderColor: '#B5B2B2',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        raws: avgRaw,
        displays: avgDisplay,
        meta: METRICS,
      } as any,
    ],
  }

  // 5) 툴팁: 원시값 + (그래프 표시값) 모두 노출
  const options: ChartOptions<'radar'> = {
    // 히트 영역 키우기
    elements: {
      point: {
        radius: 0, // 점은 안 보이게
        hitRadius: 10, // 근처 10px 범위에서도 터치/마우스 이벤트 감지
        hoverRadius: 6, // 호버 시 반응 범위 (시각적 반응 없음)
      },
    },
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
          // 상단 라벨은 플러그인에서 직접 그림 → 여기선 숨김
          callback: (label: string, idx: number) => (idx === 0 ? '' : label),
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: { display: false, stepSize: 25 },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#222',
        titleColor: '#fff',
        bodyColor: '#fff',
        callbacks: {
          title: (items) => {
            const i = items[0].dataIndex
            return METRICS[i].label
          },
          label: (ctx) => {
            const ds: any = ctx.dataset
            const i = ctx.dataIndex
            const who = ctx.datasetIndex === 0 ? '나의 지표값' : '평균 지표값'
            const raw = (ds.raws?.[i] ?? ctx.raw) as number
            return `${who}: ${Math.round(raw)}`
          },
        },
      },
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
