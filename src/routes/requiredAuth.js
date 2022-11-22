import { useLocation, Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();

  const { user_type, full_name } = JSON.parse(
    localStorage.getItem("user_info") || "{}"
  );

  // return allowedRoles?.find((role) => role === user_type)(
  //   full_name ? (
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </>
  );

  //   ) : (
  //     <Navigate to="/register" state={{ from: location }} replace />
  //   )
  // );
};
export default RequireAuth;
