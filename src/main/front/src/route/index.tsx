import App from "../App";
import { PwCheck } from "../components/layout/board/boardDetail/PwCheck";
import { BoardLayout } from "../components/layout/BoardLayout";
import { BoardDetail } from "./pages/BoardDetail";
import { BoardList } from "./pages/BoardList";
import { BoardForm } from "./pages/BoardForm";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    // 게시판 글 전체
    path: "/board",
    element: <BoardLayout />,
    children: [
      {
        // 게시판 글 전체
        path: "/board/list",
        element: <BoardList />,
      },
      {
        // 게시판 글 상세
        path: "/board/detail/:id",
        element: <BoardDetail />,
      },
      {
        // 게시판 글 작성
        path: "/board/write",
        element: <BoardForm isUpdate={false}/>,
      },
      {
        // 게시판 글 수정
        path: "/board/update/:id",
        element: <BoardForm isUpdate={true}/>,
      },
    ],
  },
  {
    // 비밀번호 확인인
    path: "/board/pwCheck",
    element: <PwCheck />,
  },
];

export default routes;
