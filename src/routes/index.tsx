import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Checkout from "../component/Checkout";
import Failed from "../component/Failed";
import Pay from "../component/Pay";
import Success from "../component/Success";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Checkout />,
      },
      {
        path: "/pay/:price/:session",
        element: <Pay />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/failed",
        element: <Failed />,
      },
    ],
  },
]);

export default router;
