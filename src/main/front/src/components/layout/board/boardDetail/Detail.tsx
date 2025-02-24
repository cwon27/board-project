import React from "react";
import { FileData } from "../../../../model/types";
import { useBoardDetail } from "../../../../hooks/useQuery";
import { handleDownload } from "../../../../utils/boardUtil";

interface DetailProps {
  boardNo: number;
}

export const Detail = ({ boardNo }: DetailProps) => {
  //상세정보 데이터 가져오기
  const { data, isLoading, error } = useBoardDetail(boardNo);

  if (isLoading) return <p>로딩중....</p>;
  if (error) return <p>상세 값 가져오는데 에러남</p>;

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
