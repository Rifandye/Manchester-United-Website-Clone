import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Merchandise from "./pages/Merchandise";
import Layout from "./pages/LayoutPage";
import Category from "./pages/Category";
import AddMerch from "./pages/AddMerchandise";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/merchandises",
        element: <Merchandise />,
      },
      {
        path: "/categories",
        element: <Category />,
      },
      {
        path: "/add-merchandise",
        element: <AddMerch />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
