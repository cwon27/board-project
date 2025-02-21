import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteData, passwordCheck } from "../../../../apis/service";
import { useSearch } from "../../../../hooks/useSearch";

export const PwCheck = () => {
  //닫기버튼 클릭시 뒤로가기
  const navigator = useNavigate();
  const handleClose = () => {
    navigator(-1);
  }

  //board_no
  const { board_no } = useParams();
  const boardNo = board_no ? parseInt(board_no) : 0;

  //비밀번호값 상태 관리
  const [password, setPassword] = useState<string>("");

  const handlePwValue = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setPassword(e.target.value);
  }

  //action 
  const urlParams = new URLSearchParams(location.search);
  const action = urlParams.get("action");

  //검색조건 초기화
  const { resetSearch } = useSearch();

  //비밀번호 확인 api 호출
  const handlePwCheck = async () => {
    try {
      if (!password || password.length>100) {
        alert("비밀번호를 입력해주세요.");
        return;
      }

      const response = await passwordCheck(boardNo, password);
      if (response.success) {
        // 비밀번호 일치
        //수정
        if (action == "edit") {
          // 수정 작업을 처리하고 수정 페이지로 이동
          navigator(`/board/update/${boardNo}`);
        } else if (action == "delete") {
          //삭제
          const isConfirm = confirm("정말 삭제하시겠습니까?");
          if(isConfirm){
            //삭제 진행
            console.log(boardNo);
            const deleteResponse = await deleteData(boardNo);

            if(deleteResponse.success){
              alert("삭제가 완료되었습니다!");
              resetSearch();
              navigator("/board/list")
            }else{
              alert("삭제를 실패했습니다.");
            }
          }
        }
      } else {
        // 비밀번호 불일치시 다시 입력
        alert("비밀번호가 일치하지 않습니다. 다시 입력하세요.");
        setPassword("");
      }
    } catch (error) {
      console.error('비밀번호 확인 중 오류 발생:', error);
    }
  }

  return (
    <div className="pop-wrap">
      <h1 className="pop-tit">비밀번호 확인</h1>
      <div className="pop-con">
        <table className="view">
          <colgroup>
            <col style={{ width: "100px" }} />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th>비밀번호</th>
              <td>
                <input
                  type="password"
                  className="input"
                  style={{ width: "200px" }}
                  value={password}
                  onChange={handlePwValue}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handlePwCheck();
                    }
                  }}
                />
                <button className="btn btn-red" onClick={handlePwCheck}>
                  확인
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="btn-box">
          <Link to="" className="btn btn-default" onClick={handleClose}>
            닫기
          </Link>
        </div>
      </div>
    </div>
  );
};
