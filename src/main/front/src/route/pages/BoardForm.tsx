import { useParams } from "react-router-dom";
import { Form } from "../../components/layout/board/boardForm/Form";
import { useQuery } from "@tanstack/react-query";
import { getBoardDetail, getFileData } from "../../apis/service";

interface BoardFormProps {
  isUpdate: boolean;
}

export const BoardForm = ({ isUpdate }: BoardFormProps) => {
  //수정 초기 데이터
  const { board_no } = useParams();
  const boardNo = board_no ? parseInt(board_no) : 0;

  //게시글 가져오기

  const { data , isLoading, error } = useQuery({
    queryKey: ['detailData', boardNo],
    queryFn : async () => {
      const boardDetail = await getBoardDetail(boardNo);
      const fileData = await getFileData(boardNo);
      return { boardDetail, fileData };
    },
    enabled: isUpdate
  });

  if (isUpdate&&isLoading) return <p>로딩중....</p>;
  if (error) return <p>수정데이터 값 가져오는데 에러남</p>;

  return (
    <>
      <Form isUpdate={isUpdate}
      initialData={data} />
    </>
  );
};
