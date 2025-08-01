import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import NotFoundPage from './pages/NotFoundPage'
import Main from './pages/MainPage'
import CommunityPage from './pages/CommunityPage'
import ResultPage from './pages/ResultPage'
import RecommendPage from './pages/RecommendPage'
import MyPage from './pages/Mypage'
import ConcernListPage from './pages/ConcernListPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import ProductRecommendationPage from './pages/ProductRecommendationPage'
import ProductDetailPage from './pages/ProductDetailPage'
import HotTopicDetailPage from './pages/HotTopicDetailPage'
import ConcernDetailPage from './pages/ConcernDetailPage'
import ConcernPostPage from './pages/ConcernPostPage'

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
        path: 'login',
        element: <SignInPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'community',
        element: <CommunityPage />,
      },
      {
        path: 'community/hot-topics/:id',
        element: <HotTopicDetailPage />,
      },
      {
        path: 'community/concerns/:id',
        element: <ConcernDetailPage />,
      },
      {
        path: 'community/concerns/post',
        element: <ConcernPostPage />,
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
      {
        path: 'productRecommendation',
        element: <ProductRecommendationPage />,
      },
      {
        path: 'productRecommendation/:category',
        element: <ProductRecommendationPage />,
      },
      {
        path: 'product/:id',
        element: <ProductDetailPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
