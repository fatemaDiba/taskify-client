import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import TaskManager from "../task-manager/TaskManager";
import SignIn from "../sign-in/SignIn";
import Private from "./Private";
import PrivateAlt from "./PrivateAlt";
import Error from "../components/error/Error";
import Home from "../home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/task-manager",
        element: (
          <Private>
            <TaskManager />
          </Private>
        ),
      },
      {
        path: "/sign-in",
        element: (
          <PrivateAlt>
            <SignIn />
          </PrivateAlt>
        ),
      },
    ],
  },
]);

export default router;
