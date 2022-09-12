import { Navigate, Route } from "react-router-dom";
import { useAppSelector } from "../../store";
import { ReactElement } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: ReactElement;
}) {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
