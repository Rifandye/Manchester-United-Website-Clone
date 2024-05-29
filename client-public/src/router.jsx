import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Home from "./pages/HomePage";
import Layout from "./pages/LayoutPage";
import Order from "./pages/Order";
import Standing from "./pages/Standing";
import News from "./pages/News";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
    loader: () => {
      if (localStorage.getItem("access_token")) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.getItem("access_token")) {
        return redirect("/");
      }
      return null;
    },
  },
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
      {
        path: "/cart",
        element: <Cart />,
      },
    ],

    loader: () => {
      if (!localStorage.getItem("access_token")) {
        return redirect("/login");
      }
      return null;
    },
  },
]);

export default router;
