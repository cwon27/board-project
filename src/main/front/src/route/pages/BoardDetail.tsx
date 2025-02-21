import { Link, useParams } from "react-router-dom";
import { Detail } from "../../components/layout/board/boardDetail/Detail";
import { DetailBtn } from "../../components/layout/board/boardDetail/DetailBtn";

export const BoardDetail = () => {
  const { board_no } = useParams();
  const boardNo = board_no ? parseInt(board_no) : 0;

  if (!board_no) {
    return <Link to="/board/list" replace />;
  }

  return (
      <>
        <Detail board_no={board_no} boardNo={boardNo}/>
        <DetailBtn board_no={boardNo}/>
      </>
  );
}

