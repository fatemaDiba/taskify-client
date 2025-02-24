import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import TaskManager from "../task-manager/TaskManager";
import SignIn from "../sign-in/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      //   {
      //     path: "/",
      //     element: <Home />,
      //   },
      {
        path: "/task-manager",
        element: <TaskManager />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
]);

export default router;
