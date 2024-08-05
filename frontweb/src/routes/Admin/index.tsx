import "./styles.css";
import { Outlet } from "react-router";
import SidebarBootstrap from "../../components/SidebarBootstrap";

export default function Admin() {
  return (
    <div className="admin-container">
      <SidebarBootstrap />
      <Outlet />
    </div>
  );
}
