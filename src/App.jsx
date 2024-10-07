import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./dashboard/Dashboard";
import AddPost from "./dashboard/AddPost";
import ListPost from "./dashboard/ListPost";

function App() {
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
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          index: true,
          element: <h1> تست پروفایل</h1>,
        },
        {
          path: "add_post",
          element: <AddPost />,
        },
        {
          path: "post_list",
          element: <ListPost />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
