import { Navigate, Outlet } from "react-router-dom";
import userStore from "../store/UserStore";

export default function PrivateRoute(): React.ReactElement | null {
  const isAuthenticated = userStore.currentUser !== undefined;

  return !isAuthenticated ? <Navigate to="/login" /> : <Outlet />;
}
