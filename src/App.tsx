import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import NotFoundPage from './pages/NotFoundPage'
import Main from './pages/MainPage'
import CommunityPage from './pages/CommunityPage'
import ColumnPage from './pages/ColumnPage'
import ResultPage from './pages/ResultPage'
import RecommendPage from './pages/RecommendPage'
import MyPage from './pages/Mypage'
import ConcernListPage from './pages/ConcernListPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import ProductRecommendationPage from './pages/ProductRecommendationPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ConcernDetailPage from './pages/ConcernDetailPage'
import ConcernPostPage from './pages/ConcernPostPage'
import ScalpSurveyPage from './pages/ScalpSurveyPage'
import EditProfilePage from './pages/EditProfilePage'
import MonthlyReportPage from './pages/MonthlyReportPage'
import LastResultPage from './pages/LastResultPage'
import MyPostsPage from './pages/MyPostsPage'
import MyCommentsPage from './pages/MyCommentsPage'
import WishlistPage from './pages/WishlistPage'

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
        path: 'community/column',
        element: <ColumnPage />,
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
        path: 'mypage/wishlist',
        element: <WishlistPage />,
      },
      {
        path: 'mypage/posts',
        element: <MyPostsPage />,
      },
      {
        path: 'mypage/comments',
        element: <MyCommentsPage />,
      },
      {
        path: 'mypage/edit',
        element: <EditProfilePage />,
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
      {
        path: 'question',
        element: <ScalpSurveyPage />,
      },
      {
        path: 'reports',
        element: <MonthlyReportPage />,
      },
      {
        path: 'result/:date',
        element: <LastResultPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
