import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <div className="flex flex-col gap-[25px]">
        <Header />
        <div className="container mx-auto px-2 lg:px-0">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
