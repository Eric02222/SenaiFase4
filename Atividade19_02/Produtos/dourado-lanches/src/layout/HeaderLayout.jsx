import { Link, Outlet } from "react-router";
import { useAuth } from "../context/Context";
import Navbar from "../components/Navbar/Navbar";

function HeaderLayout() {

  return (
    <div  >
      <Navbar/>

      <section className="container mt-4 p-4 bg-white shadow-sm rounded">
        <Outlet />
      </section>
    </div>
  );
}

export default HeaderLayout;
