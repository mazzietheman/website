import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Dashboard";
import Page1 from "./components/page1";
import Page2 from "./components/page2";
import Login from "./Login";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "page-one",
        element: <Page1 />,
      },
      {
        path: "page-two",
        element: <Page2 />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
