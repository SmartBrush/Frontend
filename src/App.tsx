import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import NotFoundPage from './pages/NotFoundPage'
import Main from './pages/MainPage'
import CommunityPage from './pages/CommunityPage'
import ResultPage from './components/Result/ResultPage'
import RecommendPage from './pages/RecommendPage'
import MyPage from './pages/Mypage'
import HotTopicListPage from './pages/HotTopicListPage'
import ConcernListPage from './pages/ConcernListPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'community',
        element: <CommunityPage />,
      },
      {
        path: 'community/hot-topics',
        element: <HotTopicListPage />,
      },
      {
        path: 'community/concerns',
        element: <ConcernListPage />,
      },
      {
        path: 'result',
        element: <ResultPage />,
      },
      {
        path: 'recommend',
        element: <RecommendPage />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
