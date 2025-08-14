import goodIcon from '../../assets/goodIcon.svg'
import normalIcon from '../../assets/normalIcon.svg'
import badIcon from '../../assets/badIcon.svg'
import CameraUploadButton from '../../components/Main/CameraUploadButton'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  fetchTodayDiagnosis,
  isDiagnosisOk,
  type TodayDiagnosis,
} from '../../apis/diagnosis'

const TodayScalpStatus = () => {
  const navigate = useNavigate()
  const [diagnosis, setDiagnosis] = useState<TodayDiagnosis | null>(null)

  const statusColor = {
    양호: 'bg-[#24C205]',
    보통: 'bg-[#FFBD00]',
    심각: 'bg-[#FF333C]',
  }

  const statusImage = {
    양호: goodIcon,
    보통: normalIcon,
    심각: badIcon,
  }

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
    const fetchData = async () => {
      try {
        const data = await fetchTodayDiagnosis()
        setDiagnosis(data)
      } catch (err) {
        console.error('오늘 진단 결과 조회 실패:', err)
        setDiagnosis(null)
      }
    }
    fetchData()
  }, [])

  const emptyText =
    diagnosis && !isDiagnosisOk(diagnosis) && 'message' in diagnosis
      ? `${diagnosis.nickname}님, ${diagnosis.message}`
      : '사용자님, 아직 두피 진단 결과가 없어요!'

  return (
    <div className="bg-[rgba(182,232,178,0.5)] rounded-[20px] px-5 py-4 text-black h-full flex flex-col justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-[15px] font-semibold">🔥 1일째 연속 진단 중</p>
        <p className="text-[20px] font-semibold">{formatKoreanDate()}</p>
      </div>

      {diagnosis && isDiagnosisOk(diagnosis) ? (
        <div className="flex items-center gap-[15%] mt-2">
          <img
            src={statusImage[diagnosis.status]}
            alt={diagnosis.status}
            className="w-[100px] h-auto object-contain"
          />
          <div className="flex flex-col gap-1 flex-1">
            <p className="text-[16px] font-semibold">
              <span className="text-[20px] font-bold">
                {diagnosis.nickname}
              </span>
              님,
            </p>
            <p className="text-[16px]">
              현재 두피 상태는{' '}
              <span
                className={`px-2 py-1 rounded-full text-white text-sm ${statusColor[diagnosis.status]}`}
              >
                {diagnosis.status}
              </span>
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/result')}
                className="px-4 py-2 rounded-full bg-[#4E9366] text-white text-sm hover:bg-[#3D7450] cursor-pointer"
              >
                두피 다시 진단하기
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-[10%] mt-2">
          <div className="flex flex-col gap-1 flex-1 justify-center items-center">
            <p className="text-[16px] font-semibold">
              <span className="text-[18px]">{emptyText}</span>
            </p>
            <div className="flex items-center gap-3 ml-6">
              <button
                onClick={() => navigate('/result')}
                className="px-4 py-2 rounded-full border text-sm text-black"
              >
                두피 진단 바로가기
              </button>
              <CameraUploadButton />
            </div>
            <div className="mt-6">
              <button
                onClick={() => navigate('/result')}
                className="px-4 py-2 rounded-full bg-[#4E9366] text-white text-sm hover:bg-[#3D7450] cursor-pointer"
              >
                두피 다시 진단하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TodayScalpStatus
