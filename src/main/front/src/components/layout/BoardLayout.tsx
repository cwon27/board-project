import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";
import { Menubar } from "./menu/Menubar";
import { Footer } from "./footer/Footer";
import { FloatRight } from "./menu/FloatRight";
import { Container } from "./container/Container";
import "../../css/style.css";

export const BoardLayout = () => {
  return (
    <div className="wrap">
      <Header />
      <Container>
        <Menubar />
        <div className="contents">
          <div className="location">
            <span className="ic-home">HOME</span>
            <span>커뮤니티</span>
            <em>통합게시판</em>
          </div>
          <div className="tit-area">
            <h3 className="h3-tit">통합게시판</h3>
          </div>
          <Outlet />
        </div>
      </Container>
      <FloatRight />
      <Footer />
    </div>
  );
};
