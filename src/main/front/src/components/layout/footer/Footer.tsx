import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-wrap">
        <ul className="footer-link">
          <li>
            <Link to="#">개인정보처리방침</Link>
          </li>
          <li>
            <Link to="#">이메일 무단수집거부</Link>
          </li>
        </ul>
        <address>
          <b>(주)인터플러그</b> 서울시 서대문구 연세로 5다길 22-3 3층 (신촌역1번
          출구)
          <br />
        </address>
        <p className="copy">Copyright(C) 2024 by interplug. All Rights Reserved.</p>
        <div className="famliy-link">
          <button>관련 사이트 안내</button>
        </div>
      </div>
    </div>
  );
};
