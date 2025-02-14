import App from "../App";
import About from "../components/About";
import TutorialReducer from "../components/TutorialReducer";
import Chaewon from "../pages/Chaewon";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <About />,
    children: [
      {
        path: "/about/me",
        element: <h3>Me</h3>,
      },
      {
        path: "/about/you",
        element: <h3>You</h3>,
      },
    ],
  },
  {
    path: "/tutorial",
    element: <TutorialReducer />,
  },
  {
    path: "/todo",
    element: <Chaewon />,
  },
];

export default routes;
