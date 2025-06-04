import dropletImg from '../../assets/NotDiagnose.svg'
import CameraUploadButton from '../../components/Main/CameraUploadButton'
import { useNavigate } from 'react-router-dom'

const TodayScalpStatus = () => {
  const navigate = useNavigate()

  const handleDiagnosisClick = () => {
    navigate('/result')
  }

  return (
    <div className="bg-[#DDE4F0] rounded-t-[20px] p-5 pb-[40%] mt-8 text-black ">
      <h2 className="text-[18px] font-semibold mb-4">
        오늘 김도영님의 두피 상태
      </h2>

      <div className="flex items-start gap-10">
        <img src={dropletImg} alt="water-drop" className="w-[74px] mt-[25%]" />
        <div className="flex flex-col gap-3 mt-[7%]">
          <div className="relative bg-white rounded-full px-5 py-4 text-[14px] shadow w-fit">
            오늘의 두피 진단 기록이 없어요!
            <div className="absolute w-4 h-4 bg-white rounded-full left-[-13px] bottom-[-8px]" />
            <div className="absolute w-3 h-3 bg-white rounded-full left-[-25px] bottom-[-20px]" />
            <div className="absolute w-2 h-2 bg-white rounded-full left-[-35px] bottom-[-29px]" />
          </div>

          {/* 두 개의 버튼을 나란히 배치 */}
          <div className="flex items-center gap-3 ml-8 py-5">
            <button
              onClick={handleDiagnosisClick}
              className="px-4 py-2 rounded-full border-2 border-none text-sm text-black cursor-pointer"
            >
              두피 진단 바로가기
            </button>

            <CameraUploadButton
              onFileSelect={(file) => {
                console.log('선택된 파일:', file)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodayScalpStatus
