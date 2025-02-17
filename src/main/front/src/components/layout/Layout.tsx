import { Outlet } from "react-router-dom"
import { Header } from "./header/Header";
import { Menubar } from "./menu/Menubar";
import { Footer } from "./footer/Footer";

export const Layout = () => {
    return (
        <>
        <Header/>
          <Menubar/>
            <div className="content">
                <Outlet/>
            </div>
          <Footer/>
        </>
    );
  }