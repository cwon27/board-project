import { Outlet } from "react-router-dom";
import { Header } from "./components/layout/header/Header";
import { Container } from "./components/layout/container/Container";
import { Menubar } from "./components/layout/menu/Menubar";
import { FloatRight } from "./components/layout/menu/FloatRight";
import { Footer } from "./components/layout/footer/Footer";
import "./css/style.css";

export const App = () => {
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
