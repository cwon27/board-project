import { Layout } from "../components/layout/Layout";
import { BoardDetail } from "./pages/BoardDetail";
import { BoardList } from "./pages/BoardList";
import { BoardUpdate } from "./pages/BoardUpdate";
import { BoardWrite } from "./pages/BoardWrite";


const routes = [
  {
    // 게시판 글 전체
    path: "/",
    element: <Layout />,
    children: [
      {
        // 게시판 글 전체
        path: "boardList",
        element: <BoardList />,
      },
      {
         // 게시판 글 상세
        path: "boardDetail/:id",
        element: <BoardDetail />,
      },
      {
         // 게시판 글 작성
        path: "boardWrite",
        element: <BoardWrite />,
      },
      {
         // 게시판 글 수정
        path: "boardUpdate/:id",
        element: <BoardUpdate />,
      },
    ]
  },
];

export default routes;
