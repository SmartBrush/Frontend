import goodIcon from '../../assets/goodIcon.png'
import normalIcon from '../../assets/normalIcon.png'
import badIcon from '../../assets/badIcon.png'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  fetchTodayDiagnosis,
  isDiagnosisOk,
  type TodayDiagnosis,
  uploadDiagnosis,
  type DiagnosisResult,
} from '../../apis/diagnosis'
import LoadingOverlay from './LoadingOverlay'
import { fetchAttendance } from '../../apis/main'

const TodayScalpStatus = () => {
  const navigate = useNavigate()
  const [diagnosis, setDiagnosis] = useState<TodayDiagnosis | null>(null)
  const [loading, setLoading] = useState(false)
  const [streak, setStreak] = useState<number | null>(null)

  const statusColor = {
    양호: 'bg-[#24C205]',
    보통: 'bg-[#FFBD00]',
    심각: 'bg-[#FF333C]',
  } as const

  const statusImage = {
    양호: goodIcon,
    보통: normalIcon,
    심각: badIcon,
  } as const

  const sampleImages = [goodIcon, normalIcon, badIcon]

  const formatKoreanDate = (dateStr?: string) => {
    const date = dateStr ? new Date(dateStr) : new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const weekdayNames = [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ]
    const dayName = weekdayNames[date.getDay()]
    return `${year}년 ${month}월 ${day}일 ${dayName}`
  }

  useEffect(() => {
    const run = async () => {
      try {
        const [today, attendance] = await Promise.all([
          fetchTodayDiagnosis().catch(() => null),
          fetchAttendance().catch(() => null),
        ])
        if (today) setDiagnosis(today)
        if (attendance) setStreak(attendance.currentStreak)
      } catch (err) {
        console.error('초기 데이터 로드 실패:', err)
        setDiagnosis(null)
        setStreak(null)
      }
    }
    run()
  }, [])

  const emptyText =
    diagnosis && !isDiagnosisOk(diagnosis) && 'message' in diagnosis
      ? `${diagnosis.nickname}님, ${diagnosis.message}`
      : '사용자님, 아직 두피 진단 결과가 없어요!'

  const streakText =
    typeof streak === 'number' && streak > 0
      ? `🔥${streak}일째 연속 진단 중`
      : null

  // 업로드+진단 실행 → ResultPage로 이동
  const handleUploadAndGo = async () => {
    if (loading) return
    setLoading(true)
    try {
      const res: DiagnosisResult = await uploadDiagnosis()

      const diagForResult = {
        scalpSensitivityValue: res.scalpSensitivityValue,
        scalpSensitivityLevel: res.scalpSensitivityLevel,
        densityValue: res.densityValue,
        densityLevel: res.densityLevel,
        sebumLevelValue: res.sebumLevelValue,
        sebumLevel: res.sebumLevel,
        poreSizeValue: res.poreSizeValue,
        poreSizeLevel: res.poreSizeLevel,
        scalingValue: res.scalingValue,
        scalingLevel: res.scalingLevel,
        score: res.score,
        status: res.status,
      }

      const imagesForResult =
        res.images?.map((it, idx) => ({
          id: it.id ?? idx + 1,
          src: it.url,
          label: it.label ?? `이미지 ${idx + 1}`,
        })) ?? undefined

      // 페이지 이동(언마운트되면서 오버레이 자동 사라짐)
      navigate('/result', {
        state: { diagnosis: diagForResult, images: imagesForResult },
      })
    } catch (e) {
      console.error('진단 업로드/실행 실패:', e)
      alert('빗을 사용한 후, 다시 진단해주세요.')
      setLoading(false) // 실패 시 오버레이 해제
    }
  }

  return (
    <div className="relative z-10">
      {loading && (
        <LoadingOverlay message="정확한 진단을 위해 잠시만 기다려주세요." />
      )}
      <div className="bg-[rgba(182,232,178,0.5)] rounded-t-[20px] px-5 py-4 text-black flex flex-col justify-start">
        <div className="flex flex-col gap-1">
          {streakText && (
            <p className="text-[15px] font-semibold">{streakText}</p>
          )}
          <p className="text-[20px] font-semibold">{formatKoreanDate()}</p>
        </div>

        {diagnosis && isDiagnosisOk(diagnosis) ? (
          <div className="flex items-center gap-[15%] mt-2">
            <img
              src={statusImage[diagnosis.status]}
              alt={diagnosis.status}
              className="w-[100px] h-auto object-contain"
            />
            <div className="flex flex-col gap-1 flex-1 mt-3">
              <p className="text-[10px] font-semibold">
                <span className="text-[20px] font-bold mt-2">
                  {diagnosis.nickname}님,
                </span>
              </p>
              <p className="text-[18px]">
                현재 두피 상태는{' '}
                <span
                  className={`px-3 py-1.5 rounded-[10px] font-bold text-white text-[15px] ${statusColor[diagnosis.status]}`}
                >
                  {diagnosis.status}
                </span>
              </p>
              <div className="mt-6">
                <button
                  onClick={handleUploadAndGo}
                  disabled={loading}
                  className="px-4 py-2 rounded-full bg-[#4E9366] text-white text-sm hover:bg-[#3D7450] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? '진단 중…' : '두피 다시 진단하기'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-[10%]">
            <div className="flex flex-col gap-1 flex-1 justify-center items-center">
              <p className="text-[16px] font-semibold mt-3">
                <span className="text-[13px]">{emptyText}</span>
              </p>

              <div className="flex gap-3 justify-center mt-4">
                {sampleImages.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`placeholder-${idx + 1}`}
                    className="w-[74px] h-[100px]"
                  />
                ))}
              </div>

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={handleUploadAndGo}
                  disabled={loading}
                  className="px-4 py-2 rounded-full bg-[#4E9366] text-white text-sm hover:bg-[#3D7450] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? '진단 중…' : '두피 진단 바로가기'}
                </button>
                {/* <CameraUploadButton /> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TodayScalpStatus
