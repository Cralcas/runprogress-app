import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";

export const Layout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Copyright</footer>
    </>
  );
};
