// import Calendar from '../components/Main/Calendar'
// import TodayScalpStatus from '../components/Main/TodayScalpStatus'

// const MainPage = () => {
//   return (
//     <div className="h-screen flex flex-col">
//       <div className="flex-[0_0_55%]">
//         <Calendar />
//       </div>
//       <div className="flex-[0_0_45%] overflow-hidden">
//         <TodayScalpStatus />
//       </div>
//     </div>
//   )
// }

// export default MainPage

import Calendar from '../components/Main/Calendar'
import TodayScalpStatus from '../components/Main/TodayScalpStatus'

const MainPage = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-1">
        <Calendar />
      </div>
      <div className="flex-1">
        <TodayScalpStatus />
      </div>
    </div>
  )
}

export default MainPage
