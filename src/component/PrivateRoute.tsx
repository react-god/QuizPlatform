import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
import userStore from "../store/UserStore";

interface PrivateRouteProps {
  children?: ReactElement; // Router.tsx에서 PrivateRoute가 감싸고 있는 Componet Element
}

export default function PrivateRoute({}: PrivateRouteProps): React.ReactElement | null {
  const isAuthenticated = userStore.currentUser !== undefined;

  return !isAuthenticated ? <Navigate to="/login" /> : <Outlet />;
}
