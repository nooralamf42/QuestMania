import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Create, Home, Messages, Signin, Signup } from "./pages";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { Protected } from "./components/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: <Protected><Signin /></Protected>,
      },
      {
        path: "/signup",
        element: <Protected><Signup /></Protected>,
      },
      {
        path : "/messages",
        element: <Messages/>
      },
      {
        path : "/user/:username",
        element: <Create/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
