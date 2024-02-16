import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Merchandise from "./pages/Merchandise";
import Layout from "./pages/LayoutPage";
import Category from "./pages/Category";
import AddMerch from "./pages/AddMerchandise";
import EditMerchandise from "./pages/EditMerchandise";
import SeeDetail from "./pages/SeeDetailCategory";


const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
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
        path: "/categories/:id",
        element: <SeeDetail />,
      },
      {
        path: "/add-merchandise",
        element: <AddMerch />,
      },
      {
        path: "/merchandises/:id",
        element: <EditMerchandise />,
      },
    ],
  },
]);

export default router;
