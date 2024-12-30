import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "../auth/AuthProvider";
import { Layout } from "../pages/Layout";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { ProtectedRoute } from "./ProtectedRoute";
import { Profile } from "../pages/Profile";
import { NotFound } from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
    errorElement: <NotFound />,
  },
]);
