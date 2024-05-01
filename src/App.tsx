import {
  RouterProvider,
  createBrowserRouter,
  useParams,
} from "react-router-dom";
import "./App.css";
import { Lecturers } from "./pages/Lecturers";
import { Administration } from "./pages/Administration";
import ErrorPage from "./pages/Error";
import { Root } from "./pages/Root";
import Workshops from "./pages/Workshops";
import { Home } from "./pages/Home";

function App() {
  let { userId } = useParams();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/radionice",
          element: <Workshops />,
        },
        {
          path: "/predavaci",
          element: <Lecturers />,
        },
        {
          path: "/administracija",
          element: <Administration />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
