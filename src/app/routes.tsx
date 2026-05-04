import { createBrowserRouter, Navigate } from "react-router";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { PackageDetail } from "./pages/PackageDetail";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminPackages } from "./pages/admin/AdminPackages";
import { AdminPackageForm } from "./pages/admin/AdminPackageForm";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { Outlet } from "react-router";
import { Toaster } from "sonner";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster position="top-right" richColors />
    </>
  );
}

function ProtectedAdminLayout() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AdminLayout />
        <Toaster position="top-right" richColors />
      </ProtectedRoute>
    </AuthProvider>
  );
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: Home },
      { path: "paket/:id", Component: PackageDetail },
    ],
  },
  {
    path: "/admin/login",
    element: (
      <AuthLayout>
        <AdminLogin />
      </AuthLayout>
    ),
  },
  {
    path: "/admin",
    Component: ProtectedAdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "paketler", Component: AdminPackages },
      { path: "paketler/yeni", Component: AdminPackageForm },
      { path: "paketler/:id/duzenle", Component: AdminPackageForm },
    ],
  },
]);
