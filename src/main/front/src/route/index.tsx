import App from "../App";
import BoardDetail from "./pages/BoardDetail";
import BoardWrite from "./pages/BoardWrite";
import BoardUpdate from "./pages/BoardUpdate";

const routes = [
  {
    // 게시판 글 전체
    path: "/",
    element: <App />,
  },
  {
    path: "/boardDetail/:id",
    element: <BoardDetail />,
  },
  {
    path: "/boardWrite",
    element: <BoardWrite />,
  },
  {
    path: "/boardUpdate/:id",
    element: <BoardUpdate />,
  },
];

export default routes;
