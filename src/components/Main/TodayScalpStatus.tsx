// import dropletImg from '../../assets/NotDiagnose.svg'
// import CameraUploadButton from '../../components/Main/CameraUploadButton'
// import { useNavigate } from 'react-router-dom'

// const TodayScalpStatus = () => {
//   const navigate = useNavigate()

//   const handleDiagnosisClick = () => {
//     navigate('/result')
//   }

//   return (
//     <div className="bg-[#DDE4F0] rounded-t-[20px] p-5 pb-[40%] mt-8 text-black ">
//       <h2 className="text-[18px] font-semibold mb-4">
//         오늘 김도영님의 두피 상태
//       </h2>

//       <div className="flex items-start gap-10">
//         <img src={dropletImg} alt="water-drop" className="w-[74px] mt-[13%]" />
//         <div className="flex flex-col gap-3 mt-[1%]">
//           <div className="relative bg-white rounded-full px-5 py-4 text-[14px] shadow w-fit">
//             오늘의 두피 진단 기록이 없어요!
//             <div className="absolute w-4 h-4 bg-white rounded-full left-[-3px] bottom-[-8px]" />
//             <div className="absolute w-3 h-3 bg-white rounded-full left-[-15px] bottom-[-20px]" />
//             <div className="absolute w-2 h-2 bg-white rounded-full left-[-25px] bottom-[-29px]" />
//           </div>

//           {/* 두 개의 버튼을 나란히 배치 */}
//           <div className="flex items-center gap-3 ml-8 py-5">
//             <button
//               onClick={handleDiagnosisClick}
//               className="px-4 py-2 rounded-full border-2 border-none text-sm text-black cursor-pointer"
//             >
//               두피 진단 바로가기
//             </button>

//             <CameraUploadButton
//               onFileSelect={(file) => {
//                 console.log('선택된 파일:', file)
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default TodayScalpStatus

import dropletImg from '../../assets/NotDiagnose.svg'
import goodIcon from '../../assets/goodIcon.png'
import normalIcon from '../../assets/normalIcon.png'
import badIcon from '../../assets/badIcon.png'
import CameraUploadButton from '../../components/Main/CameraUploadButton'
import { useNavigate } from 'react-router-dom'

const TodayScalpStatus = () => {
  const navigate = useNavigate()

  const handleDiagnosisClick = () => {
    navigate('/result')
  }

  // ✅ 로컬 스토리지에서 오늘의 상태 불러오기
  const saved = localStorage.getItem('scalp_status')
  const parsed = saved ? JSON.parse(saved) : null
  const todayStatus = parsed?.status || null

  // 상태별 이모지 이미지 매핑
  const statusImage = {
    양호: goodIcon,
    보통: normalIcon,
    심각: badIcon,
  }

  return (
    <div className="bg-[#DDE4F0] rounded-t-[20px] px-5 py-4 text-black h-full flex flex-col">
      <h2 className="text-[18px] font-semibold mb-2">
        오늘 김도영님의 두피 상태
      </h2>

      {todayStatus ? (
        // ✅ 기록 있을 때 (상태 표시)
        <div className="flex flex-col items-center justify-start mt-5 flex-1 overflow-hidden ">
          <img
            src={statusImage[todayStatus]}
            alt={todayStatus}
            className="w-[70px] h-auto object-contain mb-2"
          />
          <p className="text-[15px] font-semibold">상태</p>
          <span
            className={`mt-1 px-4 py-1 rounded-full text-white text-sm ${
              todayStatus === '양호'
                ? 'bg-[#4CAF50]'
                : todayStatus === '보통'
                  ? 'bg-[#FFC107]'
                  : 'bg-[#F44336]'
            }`}
          >
            {todayStatus}
          </span>
        </div>
      ) : (
        // ❌ 기록 없을 때
        <div className="flex items-start gap-10 mt-3 flex-1">
          <img
            src={dropletImg}
            alt="water-drop"
            className="w-[74px] h-auto object-contain mt-6"
          />
          <div className="flex flex-col gap-3 mt-3">
            <div className="relative bg-white rounded-full px-5 py-3 text-sm shadow w-fit">
              오늘의 두피 진단 기록이 없어요!
              <div className="absolute w-3 h-3 bg-white rounded-full left-[-10px] bottom-[-6px]" />
              <div className="absolute w-2 h-2 bg-white rounded-full left-[-18px] bottom-[-13px]" />
              <div className="absolute w-1.5 h-1.5 bg-white rounded-full left-[-24px] bottom-[-19px]" />
            </div>

            <div className="flex items-center gap-3 ml-6">
              <button
                onClick={handleDiagnosisClick}
                className="px-4 py-2 rounded-full border text-sm text-black"
              >
                두피 진단 바로가기
              </button>
              <CameraUploadButton />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TodayScalpStatus
