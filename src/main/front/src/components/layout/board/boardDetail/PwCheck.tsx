export const PwCheck = () => {
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
                />
                <a href="#" className="btn btn-red">
                  확인
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="btn-box">
          <a href="javascript:self.close();" className="btn btn-default">
            닫기
          </a>
        </div>
      </div>
    </div>
  );
};
