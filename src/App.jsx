import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./Login";

function App() {
  const [count, setCount] = useState(0);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <h1>test</h1>
          <Outlet />
        </>
      ),
      children: [
        {
          index: true,
          element: <h2>سلام</h2>,
        },
        {
          path: "about",
          element: <h2>about</h2>,
        },
        {
          path: "login",
          element: <Login />,
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
