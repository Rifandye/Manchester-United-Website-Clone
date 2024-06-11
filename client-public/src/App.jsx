import { RouterProvider } from "react-router-dom";
import router from "./router";
import { store } from "./store";
import { Provider } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  );
}

export default App;
