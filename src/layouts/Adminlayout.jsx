import { Navigate, Outlet } from "react-router-dom";

function AdminLayout() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {/* Layout riêng nếu muốn */}
      <Outlet />
    </div>
  );
}

export default AdminLayout;
