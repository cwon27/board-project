import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  downloadFile,
  downloadincrement,
  getBoardDetail,
  getFileData,
  viewCount,
} from "../../../../apis/service";
import { FileData } from "../../../../model/types";

interface DetailProps {
  board_no: string;
  boardNo: number;
}

export const Detail = ({ board_no, boardNo }: DetailProps) => {
  //상세정보 데이터 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ["detailData", boardNo],
    queryFn: async () => {
      const boardDetail = await getBoardDetail(boardNo);
      const viewCnt = await viewCount(boardNo);
      const fileData = await getFileData(boardNo);
      return { boardDetail, viewCnt, fileData };
    },
    enabled: !!board_no,
  });

  if (isLoading) return <p>로딩중....</p>;
  if (error) return <p>리스트 값 가져오는데 에러남</p>;

  //파일 다운로드
  const handleDownload = async (file_no: number) => {
    try {
      const result = await downloadFile(file_no);
      if (result == 1) {
        await downloadincrement(file_no);
      }
    } catch (error) {
      console.error("파일 다운로드 중 오류 발생:", error);
    }
  };

  return (
    <table className="write">
      <colgroup>
        <col style={{ width: "150px" }} />
        <col />
        <col style={{ width: "150px" }} />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <th className="fir">작성자</th>
          <td>{data?.boardDetail.writer_nm}</td>
          <th className="fir">작성일시</th>
          <td>{data?.boardDetail.reg_dt}</td>
        </tr>
        <tr>
          <th className="fir">카테고리</th>
          <td colSpan={3}>{data?.boardDetail.comm_cd_nm}</td>
        </tr>
        <tr>
          <th className="fir">제목</th>
          <td colSpan={3}>{data?.boardDetail.title}</td>
        </tr>
        <tr>
          <th className="fir">내용</th>
          <td colSpan={3}>
            <div dangerouslySetInnerHTML={{ __html: data?.boardDetail.cont }} />
          </td>
        </tr>
        <tr>
          <th className="fir">첨부파일</th>
          <td colSpan={3}>
            {data?.fileData.map((file: FileData) => {
              return (
                <React.Fragment key={file.file_no}>
                  <span>
                    <button
                      className="ic-file2 fileBtn"
                      onClick={() => handleDownload(file.file_no)}
                    >
                      {file.origin_file_nm}
                    </button>
                  </span>
                  <br />
                </React.Fragment>
              );
            })}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
