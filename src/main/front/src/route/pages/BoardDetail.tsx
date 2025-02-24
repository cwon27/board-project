import { Navigate, useParams } from "react-router-dom";
import { Detail } from "../../components/layout/board/boardDetail/Detail";
import { DetailBtn } from "../../components/layout/board/boardDetail/DetailBtn";

export const BoardDetail = () => {
  const { board_no } = useParams();
  const boardNo = board_no ? parseInt(board_no) : 0;

  if (!board_no) {
    return <Navigate to="/board/list" replace />;
  }

  return (
    <>
      <Detail boardNo={boardNo} />
      <DetailBtn board_no={boardNo} />
    </>
  );
};
