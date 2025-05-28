import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import NotFoundPage from "./pages/NotFoundPage";
import Main from "./pages/MainPage";
import CommunityPage from "./pages/CommunityPage";
import ResultPage from "./pages/ResultPage";
import RecommendPage from "./pages/RecommendPage";
import MyPage from "./pages/Mypage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "community",
        element: <CommunityPage />,
      },
      {
        path: "result",
        element: <ResultPage />,
      },
      {
        path: "recommend",
        element: <RecommendPage />,
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
