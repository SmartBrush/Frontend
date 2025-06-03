// import Calendar, { type DateCount } from '../components/Main/Calendar'

// const mockData: DateCount[] = [
//   { date: '2025-06-03', count: 1 },
//   { date: '2025-06-10', count: 3 },
//   { date: '2025-06-20', count: 2 },
// ]

// const MainPage = () => {
//   return <Calendar dateCounts={mockData} />
// }

// export default MainPage

import Calendar from '../components/Main/Calendar'
import TodayScalpStatus from '../components/Main/TodayScalpStatus'

const MainPage = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-1 h-1/2">
        <Calendar />
      </div>
      <div className="flex-1 h-1/2">
        <TodayScalpStatus />
      </div>
    </div>
  )
}

export default MainPage
