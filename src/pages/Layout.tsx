import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";

export const Layout = () => {
  return (
    <div className="layout-wrapper">
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Copyright</footer>
    </div>
  );
};
