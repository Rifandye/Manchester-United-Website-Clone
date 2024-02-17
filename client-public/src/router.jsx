import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/HomePage";
import Layout from "./pages/LayoutPage";
import Order from "./pages/Order";
import Standing from "./pages/Standing";
import News from "./pages/News";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/standing",
        element: <Standing />,
      },
      {
        path: "/news",
        element: <News />,
      },
    ],
  },
]);

export default router;
