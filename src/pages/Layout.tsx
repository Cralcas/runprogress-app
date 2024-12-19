import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import { FooterContent } from "../components/FooterContent/FooterContent";

export const Layout = () => {
  return (
    <div className="layout-wrapper">
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <FooterContent />
      </footer>
    </div>
  );
};
