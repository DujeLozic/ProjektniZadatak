import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Lecturers } from "./pages/Lecturers";
import { Administration } from "./pages/Administration";
import ErrorPage from "./pages/Error";
import { Root } from "./pages/Root";
import Workshops from "./pages/Workshops";
import { Home } from "./pages/Home";
import { useState } from "react";
import { Context } from "./Context";

function App() {
  const [user, setUser] = useState("User");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root setUser={setUser} />,
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
    <Context.Provider value={user}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
}

export default App;
